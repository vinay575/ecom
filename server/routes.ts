import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { z } from "zod";
import { insertCartItemSchema, insertReviewSchema, insertWishlistSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware - Replit Auth integration
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const { category } = req.query;
      const products = await storage.getAllProducts(
        category ? { category: category as string } : undefined
      );
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/products/search/:query", async (req, res) => {
    try {
      const products = await storage.searchProducts(req.params.query);
      res.json(products);
    } catch (error) {
      console.error("Error searching products:", error);
      res.status(500).json({ message: "Failed to search products" });
    }
  });

  // Cart routes (protected)
  app.get("/api/cart", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const cartItems = await storage.getCartItems(userId);
      res.json(cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Validate request body
      const bodySchema = z.object({
        productId: z.string(),
        quantity: z.number().int().positive().optional(),
      });
      const validated = bodySchema.parse(req.body);
      
      const cartItem = await storage.addToCart({
        userId,
        productId: validated.productId,
        quantity: validated.quantity || 1,
      });
      res.json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });

  app.patch("/api/cart/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Validate request body
      const bodySchema = z.object({
        quantity: z.number().int().positive(),
      });
      const validated = bodySchema.parse(req.body);
      
      // Verify ownership
      const existingItem = await storage.getCartItemById(req.params.id);
      if (!existingItem || existingItem.userId !== userId) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      const cartItem = await storage.updateCartItem(req.params.id, validated.quantity);
      res.json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      console.error("Error updating cart item:", error);
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Verify ownership
      const existingItem = await storage.getCartItemById(req.params.id);
      if (!existingItem || existingItem.userId !== userId) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      await storage.removeFromCart(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ message: "Failed to remove from cart" });
    }
  });

  // Wishlist routes (protected)
  app.get("/api/wishlist", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const wishlist = await storage.getWishlist(userId);
      res.json(wishlist);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      res.status(500).json({ message: "Failed to fetch wishlist" });
    }
  });

  app.post("/api/wishlist", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Validate request body
      const bodySchema = z.object({
        productId: z.string(),
      });
      const validated = bodySchema.parse(req.body);
      
      const wishlistItem = await storage.addToWishlist({
        userId,
        productId: validated.productId,
      });
      res.json(wishlistItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      console.error("Error adding to wishlist:", error);
      res.status(500).json({ message: "Failed to add to wishlist" });
    }
  });

  app.delete("/api/wishlist/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Verify ownership
      const existingItem = await storage.getWishlistItemById(req.params.id);
      if (!existingItem || existingItem.userId !== userId) {
        return res.status(404).json({ message: "Wishlist item not found" });
      }
      
      await storage.removeFromWishlist(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      res.status(500).json({ message: "Failed to remove from wishlist" });
    }
  });

  // Review routes
  app.get("/api/products/:id/reviews", async (req, res) => {
    try {
      const reviews = await storage.getProductReviews(req.params.id);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/products/:id/reviews", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Validate request body
      const bodySchema = z.object({
        rating: z.number().int().min(1).max(5),
        comment: z.string().optional(),
      });
      const validated = bodySchema.parse(req.body);
      
      const review = await storage.createReview({
        productId: req.params.id,
        userId,
        rating: validated.rating,
        comment: validated.comment,
        isVerifiedPurchase: false, // Will be updated based on order history
      });
      res.json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Order routes (protected)
  app.get("/api/orders", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const orders = await storage.getUserOrders(userId);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", isAuthenticated, async (req, res) => {
    try {
      const order = await storage.getOrderWithItems(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  // Announcements API
  app.get("/api/announcements", async (req, res) => {
    try {
      const announcements = [
        {
          id: "1",
          content: "🎉 New Year Sale - Up to 50% off on all digital products!",
          link: "/deals",
          type: "promo"
        },
        {
          id: "2",
          content: "✨ Free shipping on orders over $50",
          type: "info"
        },
        {
          id: "3",
          content: "🚀 Check out our new AI-powered tools collection!",
          link: "/categories/ai-tools",
          type: "info"
        }
      ];
      res.json(announcements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      res.status(500).json({ message: "Failed to fetch announcements" });
    }
  });

  // Enhanced search API
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query || query.length < 2) {
        return res.json({ results: [] });
      }
      
      const products = await storage.searchProducts(query);
      const results = products.slice(0, 10).map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        price: `$${Number(p.price).toFixed(2)}`,
        image: p.image
      }));
      
      res.json({ results });
    } catch (error) {
      console.error("Error searching products:", error);
      res.status(500).json({ message: "Failed to search products" });
    }
  });





  

  // Testimonials API
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = [
        {
          id: 1,
          name: "Sarah Johnson",
          role: "Marketing Director",
          avatar: "/attached_assets/generated_images/Female_customer_testimonial_avatar_0a96e832.png",
          rating: 5,
          content: "Amazing platform! Found exactly what I needed for my project. The quality of products is outstanding and the purchasing process was seamless. Highly recommended!",
          verified: true
        },
        {
          id: 2,
          name: "Michael Chen",
          role: "Freelance Developer",
          avatar: "/attached_assets/generated_images/Male_customer_testimonial_avatar_3deee3e5.png",
          rating: 5,
          content: "Great quality products and excellent customer service. The digital assets I purchased have significantly improved my workflow. Will definitely buy again!",
          verified: true
        },
        {
          id: 3,
          name: "Emma Rodriguez",
          role: "UI/UX Designer",
          avatar: "/attached_assets/generated_images/Young_female_testimonial_avatar_013dea30.png",
          rating: 5,
          content: "Love the variety of digital products available. The checkout process was smooth and easy. Customer support responded quickly when I had questions.",
          verified: true
        },
        {
          id: 4,
          name: "David Kim",
          role: "Business Owner",
          rating: 4,
          content: "Excellent marketplace with professional products. The pricing is fair and the instant delivery is a huge plus. Would love to see more categories in the future!",
          verified: true
        }
      ];
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });













  // Newsletter subscription API
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const bodySchema = z.object({
        email: z.string().email(),
      });
      const validated = bodySchema.parse(req.body);
      
      res.json({ 
        success: true, 
        message: "Successfully subscribed to newsletter!",
        couponCode: "WELCOME10"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid email address", errors: error.errors });
      }
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Product request API
  app.post("/api/product-requests", async (req, res) => {
    try {
      const bodySchema = z.object({
        productName: z.string().min(1),
        email: z.string().email(),
        message: z.string().optional(),
      });
      const validated = bodySchema.parse(req.body);
      
      res.json({ 
        success: true, 
        message: "Thank you for your request! We'll review it and get back to you soon."
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      console.error("Error submitting product request:", error);
      res.status(500).json({ message: "Failed to submit product request" });
    }
  });


  
  // Home slides API
// Home slides API











// ✅ API Endpoint for Hero Slides
app.get("/api/home-slides", async (req, res) => {
  try {
    const slides = [
      {
        id: 1,
        title: "Premium Digital Products",
        subtitle: "2026 Collection",
        description:
          "Discover cutting-edge digital solutions for your business",
        ctaText: "Explore Now",
        ctaLink: "/products",
        imageUrl: "/attached_assets/generated_images/hero-slide-1.png",
        backgroundColor: "#6366f1",
        highlights: [
          "Exclusive access to premium digital templates and tools",
          "Handpicked resources for professionals and creators",
          "Seamless downloads with secure payment options",
        ],
      },
      {
        id: 2,
        title: "New Year Sale",
        subtitle: "Up to 50% Off",
        description: "Limited time offer on all categories",
        ctaText: "Shop Deals",
        ctaLink: "/deals",
        imageUrl: "/attached_assets/generated_images/hero-slide-2.png",
        backgroundColor: "#f97316",
        highlights: [
          "Save big on top-rated digital assets and software",
          "Exclusive bundles for developers and designers",
          "Unlock 50% discounts before the sale ends!",
        ],
      },
      {
        id: 3,
        title: "AI-Powered Tools",
        subtitle: "Future of Work",
        description: "Transform your workflow with intelligent solutions",
        ctaText: "Learn More",
        ctaLink: "/categories",
        imageUrl: "/attached_assets/generated_images/hero-slide-3.png",
        backgroundColor: "#8b5cf6",
        highlights: [
          "Boost productivity using AI automation and analytics",
          "Smart design and coding tools for faster projects",
          "Revolutionize your business with intelligent software",
        ],
      },
    ];

    res.json(slides);
  } catch (error) {
    console.error("Error fetching home slides:", error);
    res.status(500).json({ message: "Failed to fetch home slides" });
  }
});













  const httpServer = createServer(app);

  return httpServer;
}
