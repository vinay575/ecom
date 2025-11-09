import { pgTable, text, varchar, integer, numeric, timestamp, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name"),
  passwordHash: text("password_hash"),
  phone: text("phone"),
  address: text("address"),
  role: text("role").notNull().default("user"),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  category: text("category").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  image: text("image").notNull(),
  images: text("images").array(),
  author: text("author").notNull(),
  authorId: varchar("author_id"),
  rating: numeric("rating", { precision: 3, scale: 2 }).default("0"),
  downloads: integer("downloads").notNull().default(0),
  isFeatured: boolean("is_featured").notNull().default(false),
  tags: text("tags").array(),
  licenseType: text("license_type").notNull(),
  downloadUrl: text("download_url"),
  fileSize: text("file_size"),
  version: text("version"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  productId: varchar("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull(),
  paymentIntentId: text("payment_intent_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: varchar("product_id").notNull().references(() => products.id),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull().default(1),
  licenseKey: text("license_key"),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => users.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  isVerifiedPurchase: boolean("is_verified_purchase").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const wishlist = pgTable("wishlist", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  productId: varchar("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const loginEvents = pgTable("login_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  ip: text("ip"),
  userAgent: text("user_agent"),
  device: text("device"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productRequests = pgTable("product_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productName: text("product_name").notNull(),
  email: text("email").notNull(),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role"),
  avatar: text("avatar"),
  rating: integer("rating").notNull(),
  content: text("content").notNull(),
  isVerified: boolean("is_verified").notNull().default(false),
  isVisible: boolean("is_visible").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const deals = pgTable("deals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  discountPercent: integer("discount_percent").notNull(),
  code: text("code").notNull().unique(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  productIds: text("product_ids").array(),
  categoryIds: text("category_ids").array(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const upsertUserSchema = insertUserSchema.partial({ createdAt: true, updatedAt: true });

export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);

export const insertCartItemSchema = createInsertSchema(cartItems);
export const selectCartItemSchema = createSelectSchema(cartItems);

export const insertOrderSchema = createInsertSchema(orders);
export const selectOrderSchema = createSelectSchema(orders);

export const insertOrderItemSchema = createInsertSchema(orderItems);
export const selectOrderItemSchema = createSelectSchema(orderItems);

export const insertReviewSchema = createInsertSchema(reviews);
export const selectReviewSchema = createSelectSchema(reviews);

export const insertWishlistSchema = createInsertSchema(wishlist);
export const selectWishlistSchema = createSelectSchema(wishlist);

export const insertLoginEventSchema = createInsertSchema(loginEvents);
export const selectLoginEventSchema = createSelectSchema(loginEvents);

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers);
export const selectNewsletterSubscriberSchema = createSelectSchema(newsletterSubscribers);

export const insertProductRequestSchema = createInsertSchema(productRequests);
export const selectProductRequestSchema = createSelectSchema(productRequests);

export const insertTestimonialSchema = createInsertSchema(testimonials);
export const selectTestimonialSchema = createSelectSchema(testimonials);

export const insertDealSchema = createInsertSchema(deals);
export const selectDealSchema = createSelectSchema(deals);

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpsertUser = z.infer<typeof upsertUserSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type Wishlist = typeof wishlist.$inferSelect;
export type InsertWishlist = z.infer<typeof insertWishlistSchema>;

export type LoginEvent = typeof loginEvents.$inferSelect;
export type InsertLoginEvent = z.infer<typeof insertLoginEventSchema>;

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;

export type ProductRequest = typeof productRequests.$inferSelect;
export type InsertProductRequest = z.infer<typeof insertProductRequestSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type Deal = typeof deals.$inferSelect;
export type InsertDeal = z.infer<typeof insertDealSchema>;
