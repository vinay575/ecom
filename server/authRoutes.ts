import type { Express } from "express";
import { z } from "zod";
import { storage } from "./storage";
import {
  hashPassword,
  comparePassword,
  generateToken,
  requireAuth,
} from "./authUtils";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export function registerAuthRoutes(app: Express) {
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const validated = signupSchema.parse(req.body);

      const existingUser = await storage.getUserByEmail(validated.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const passwordHash = await hashPassword(validated.password);

      const user = await storage.createUser({
        email: validated.email,
        name: validated.name,
        passwordHash,
        phone: validated.phone || null,
        address: validated.address || null,
        role: "user",
      });

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Signup error:", error);
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const validated = loginSchema.parse(req.body);

      const user = await storage.getUserByEmail(validated.email);
      if (!user || !user.passwordHash) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isValid = await comparePassword(validated.password, user.passwordHash);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      await storage.createLoginEvent({
        userId: user.id,
        ip: req.ip || req.headers['x-forwarded-for'] as string || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
        device: req.headers['user-agent']?.includes('Mobile') ? 'mobile' : 'desktop',
      });

      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  });

  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const user = (req as any).user;
      const fullUser = await storage.getUserById(user.userId);
      
      if (!fullUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        user: {
          id: fullUser.id,
          email: fullUser.email,
          name: fullUser.name,
          phone: fullUser.phone,
          address: fullUser.address,
          role: fullUser.role,
        },
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  });
}
