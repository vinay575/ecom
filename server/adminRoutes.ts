import type { Express } from "express";
import { z } from "zod";
import { storage } from "./storage";
import { requireAuth, requireAdmin } from "./authUtils";
import { insertProductSchema, insertDealSchema, insertTestimonialSchema } from "@shared/schema";

export function registerAdminRoutes(app: Express) {
  app.post("/api/admin/products", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validated = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validated);
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.patch("/api/admin/products/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validated = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(req.params.id, validated);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete("/api/admin/products/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteProduct(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  app.get("/api/admin/deals", requireAuth, requireAdmin, async (req, res) => {
    try {
      const deals = await storage.getDeals();
      res.json(deals);
    } catch (error) {
      console.error("Error fetching deals:", error);
      res.status(500).json({ message: "Failed to fetch deals" });
    }
  });

  app.post("/api/admin/deals", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validated = insertDealSchema.parse(req.body);
      const deal = await storage.createDeal(validated);
      res.json(deal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error creating deal:", error);
      res.status(500).json({ message: "Failed to create deal" });
    }
  });

  app.patch("/api/admin/deals/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validated = insertDealSchema.partial().parse(req.body);
      const deal = await storage.updateDeal(req.params.id, validated);
      if (!deal) {
        return res.status(404).json({ message: "Deal not found" });
      }
      res.json(deal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error updating deal:", error);
      res.status(500).json({ message: "Failed to update deal" });
    }
  });

  app.delete("/api/admin/deals/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteDeal(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting deal:", error);
      res.status(500).json({ message: "Failed to delete deal" });
    }
  });

  app.get("/api/admin/testimonials", requireAuth, requireAdmin, async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/admin/testimonials", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validated = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validated);
      res.json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error creating testimonial:", error);
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  app.patch("/api/admin/testimonials/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const validated = insertTestimonialSchema.partial().parse(req.body);
      const testimonial = await storage.updateTestimonial(req.params.id, validated);
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error updating testimonial:", error);
      res.status(500).json({ message: "Failed to update testimonial" });
    }
  });

  app.delete("/api/admin/testimonials/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      await storage.deleteTestimonial(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  app.get("/api/admin/analytics/logins", requireAuth, requireAdmin, async (req, res) => {
    try {
      const days = req.query.days ? parseInt(req.query.days as string) : 30;
      const analytics = await storage.getLoginAnalytics(days);
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching login analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  app.get("/api/admin/newsletter-subscribers", requireAuth, requireAdmin, async (req, res) => {
    try {
      const subscribers = await storage.getNewsletterSubscribers();
      res.json(subscribers);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      res.status(500).json({ message: "Failed to fetch subscribers" });
    }
  });

  app.get("/api/admin/product-requests", requireAuth, requireAdmin, async (req, res) => {
    try {
      const status = req.query.status as string | undefined;
      const requests = await storage.getProductRequests(status);
      res.json(requests);
    } catch (error) {
      console.error("Error fetching product requests:", error);
      res.status(500).json({ message: "Failed to fetch product requests" });
    }
  });

  app.patch("/api/admin/product-requests/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      const request = await storage.updateProductRequestStatus(req.params.id, status);
      if (!request) {
        return res.status(404).json({ message: "Product request not found" });
      }
      res.json(request);
    } catch (error) {
      console.error("Error updating product request:", error);
      res.status(500).json({ message: "Failed to update product request" });
    }
  });
}
