import { db } from "./db";
import { eq, and, desc, ilike, sql } from "drizzle-orm";
import * as schema from "@shared/schema";
import type {
  User, InsertUser, UpsertUser,
  Product, InsertProduct,
  CartItem, InsertCartItem,
  Order, InsertOrder,
  OrderItem, InsertOrderItem,
  Review, InsertReview,
  Wishlist, InsertWishlist
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  getAllProducts(filters?: { category?: string; minPrice?: number; maxPrice?: number }): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<void>;
  
  getCartItems(userId: string): Promise<(CartItem & { product: Product })[]>;
  getCartItemById(id: string): Promise<CartItem | undefined>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<void>;
  clearCart(userId: string): Promise<void>;
  
  getUserOrders(userId: string): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrderWithItems(id: string): Promise<(Order & { items: (OrderItem & { product: Product })[] }) | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  
  getProductReviews(productId: string): Promise<(Review & { user: User })[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  getWishlist(userId: string): Promise<(Wishlist & { product: Product })[]>;
  getWishlistItemById(id: string): Promise<Wishlist | undefined>;
  addToWishlist(item: InsertWishlist): Promise<Wishlist>;
  removeFromWishlist(id: string): Promise<void>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(schema.users).values(insertUser).returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(schema.users)
      .values(userData)
      .onConflictDoUpdate({
        target: schema.users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getAllProducts(filters?: { category?: string; minPrice?: number; maxPrice?: number }): Promise<Product[]> {
    let query = db.select().from(schema.products);
    
    if (filters?.category) {
      query = query.where(eq(schema.products.category, filters.category)) as any;
    }
    
    const products = await query;
    return products;
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(schema.products).where(eq(schema.products.id, id));
    return product;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await db.select().from(schema.products)
      .where(eq(schema.products.isFeatured, true))
      .limit(8);
  }

  async searchProducts(query: string): Promise<Product[]> {
    return await db.select().from(schema.products)
      .where(ilike(schema.products.title, `%${query}%`))
      .limit(20);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(schema.products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updated] = await db.update(schema.products)
      .set(product)
      .where(eq(schema.products.id, id))
      .returning();
    return updated;
  }

  async deleteProduct(id: string): Promise<void> {
    await db.delete(schema.products).where(eq(schema.products.id, id));
  }

  async getCartItems(userId: string): Promise<(CartItem & { product: Product })[]> {
    const items = await db.select().from(schema.cartItems)
      .where(eq(schema.cartItems.userId, userId))
      .innerJoin(schema.products, eq(schema.cartItems.productId, schema.products.id));
    
    return items.map(item => ({
      ...item.cart_items,
      product: item.products
    }));
  }

  async getCartItemById(id: string): Promise<CartItem | undefined> {
    const [item] = await db.select().from(schema.cartItems).where(eq(schema.cartItems.id, id));
    return item;
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const [cartItem] = await db.insert(schema.cartItems).values(item).returning();
    return cartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const [updated] = await db.update(schema.cartItems)
      .set({ quantity })
      .where(eq(schema.cartItems.id, id))
      .returning();
    return updated;
  }

  async removeFromCart(id: string): Promise<void> {
    await db.delete(schema.cartItems).where(eq(schema.cartItems.id, id));
  }

  async clearCart(userId: string): Promise<void> {
    await db.delete(schema.cartItems).where(eq(schema.cartItems.userId, userId));
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return await db.select().from(schema.orders)
      .where(eq(schema.orders.userId, userId))
      .orderBy(desc(schema.orders.createdAt));
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(schema.orders).where(eq(schema.orders.id, id));
    return order;
  }

  async getOrderWithItems(id: string): Promise<(Order & { items: (OrderItem & { product: Product })[] }) | undefined> {
    const [order] = await db.select().from(schema.orders).where(eq(schema.orders.id, id));
    if (!order) return undefined;

    const items = await db.select().from(schema.orderItems)
      .where(eq(schema.orderItems.orderId, id))
      .innerJoin(schema.products, eq(schema.orderItems.productId, schema.products.id));

    return {
      ...order,
      items: items.map(item => ({
        ...item.order_items,
        product: item.products
      }))
    };
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(schema.orders).values(order).returning();
    return newOrder;
  }

  async createOrderItem(item: InsertOrderItem): Promise<OrderItem> {
    const [orderItem] = await db.insert(schema.orderItems).values(item).returning();
    return orderItem;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const [updated] = await db.update(schema.orders)
      .set({ status })
      .where(eq(schema.orders.id, id))
      .returning();
    return updated;
  }

  async getProductReviews(productId: string): Promise<(Review & { user: User })[]> {
    const reviews = await db.select().from(schema.reviews)
      .where(eq(schema.reviews.productId, productId))
      .innerJoin(schema.users, eq(schema.reviews.userId, schema.users.id))
      .orderBy(desc(schema.reviews.createdAt));

    return reviews.map(review => ({
      ...review.reviews,
      user: review.users
    }));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db.insert(schema.reviews).values(review).returning();
    return newReview;
  }

  async getWishlist(userId: string): Promise<(Wishlist & { product: Product })[]> {
    const items = await db.select().from(schema.wishlist)
      .where(eq(schema.wishlist.userId, userId))
      .innerJoin(schema.products, eq(schema.wishlist.productId, schema.products.id));

    return items.map(item => ({
      ...item.wishlist,
      product: item.products
    }));
  }

  async getWishlistItemById(id: string): Promise<Wishlist | undefined> {
    const [item] = await db.select().from(schema.wishlist).where(eq(schema.wishlist.id, id));
    return item;
  }

  async addToWishlist(item: InsertWishlist): Promise<Wishlist> {
    const [wishlistItem] = await db.insert(schema.wishlist).values(item).returning();
    return wishlistItem;
  }

  async removeFromWishlist(id: string): Promise<void> {
    await db.delete(schema.wishlist).where(eq(schema.wishlist.id, id));
  }
}

export const storage = new DbStorage();
