import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";


async function requireAdmin(ctx: any, userId: Id<"user">) {
    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") {
        throw new Error("Unauthorized: Admin access required.");
    }
    return user;
}


//  CUSTOMER MUTATIONS

// Place a new order
export const place = mutation({
    args: {
        userId: v.optional(v.id("user")),
        customerName: v.string(),
        customerEmail: v.string(),
        shippingAddress: v.object({
            street: v.string(),
            city: v.string(),
            state: v.string(),
            zipCode: v.string(),
            country: v.string(),
        }),
        items: v.array(
            v.object({
                productId: v.union(v.number(), v.string(), v.id("products")),
                name: v.string(),
                price: v.number(),
                quantity: v.number(),
                size: v.optional(v.string()),
                color: v.optional(v.string()),
                image: v.string(),
            })
        ),
        subtotal: v.number(),
        shippingCost: v.number(),
        total: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("orders", {
            ...args,
            status: "pending",
        });
    },
});


//  CUSTOMER QUERIES

// Get orders for a specific user
export const listByUser = query({
    args: { userId: v.id("user") },
    handler: async (ctx, args) => {
        const orders = await ctx.db.query("orders").collect();
        return orders.filter((order) => order.userId === args.userId);
    },
});

// Get a single order by ID
export const getById = query({
    args: { id: v.id("orders") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});


//  ADMIN QUERIES

// (admin only - checked on frontend)
export const listAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("orders").order("desc").collect();
    },
});

// Get orders filtered by status
export const listByStatus = query({
    args: {
        status: v.union(
            v.literal("pending"),
            v.literal("processing"),
            v.literal("shipped"),
            v.literal("delivered"),
            v.literal("cancelled")
        ),
    },
    handler: async (ctx, args) => {
        const orders = await ctx.db.query("orders").order("desc").collect();
        return orders.filter((order) => order.status === args.status);
    },
});


//  ADMIN MUTATIONS

// Update order status (admin only)
export const updateStatus = mutation({
    args: {
        userId: v.id("user"),
        orderId: v.id("orders"),
        status: v.union(
            v.literal("pending"),
            v.literal("processing"),
            v.literal("shipped"),
            v.literal("delivered"),
            v.literal("cancelled")
        ),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.userId);
        await ctx.db.patch(args.orderId, { status: args.status });
        return args.orderId;
    },
});
