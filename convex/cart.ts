import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all cart items for a session
export const getCart = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cart")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
  },
});

// Get cart item count for a session
export const getCartCount = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("cart")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    return items.reduce((total, item) => total + item.quantity, 0);
  },
});

// Add item to cart (or increment quantity if same product/size/color exists)
export const addToCart = mutation({
  args: {
    sessionId: v.string(),
    productId: v.number(),
    name: v.string(),
    price: v.number(),
    image: v.string(),
    category: v.string(),
    quantity: v.number(),
    size: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if item with same product, size, and color already exists
    const existingItems = await ctx.db
      .query("cart")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    const existing = existingItems.find(
      (item) =>
        item.productId === args.productId &&
        item.size === args.size &&
        item.color === args.color,
    );

    if (existing) {
      await ctx.db.patch(existing._id, {
        quantity: existing.quantity + args.quantity,
      });
      return existing._id;
    }

    return await ctx.db.insert("cart", {
      sessionId: args.sessionId,
      productId: args.productId,
      name: args.name,
      price: args.price,
      image: args.image,
      category: args.category,
      quantity: args.quantity,
      size: args.size,
      color: args.color,
    });
  },
});

// Update item quantity
export const updateQuantity = mutation({
  args: {
    id: v.id("cart"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    if (args.quantity <= 0) {
      await ctx.db.delete(args.id);
      return null;
    }
    await ctx.db.patch(args.id, { quantity: args.quantity });
    return args.id;
  },
});

// Remove item from cart
export const removeFromCart = mutation({
  args: { id: v.id("cart") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Clear entire cart
export const clearCart = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("cart")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    for (const item of items) {
      await ctx.db.delete(item._id);
    }
  },
});
