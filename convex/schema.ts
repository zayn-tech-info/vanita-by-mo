import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  cart: defineTable({
    sessionId: v.string(),
    productId: v.number(),
    name: v.string(),
    price: v.number(),
    image: v.string(),
    category: v.string(),
    quantity: v.number(),
    size: v.optional(v.string()),
    color: v.optional(v.string()),
  }).index("by_session", ["sessionId"]),
});
