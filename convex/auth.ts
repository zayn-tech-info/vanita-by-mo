import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const signup = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    throw new Error("Use signup from authActions.ts (action) instead.");
  },
});

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    throw new Error("Use login from an action if you need bcrypt.");
  },
});

export const checkUserExists = mutation({
  args: {
    email: v.string()
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("user")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    return !!user;
  },
});

export const insertUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const newUser = await ctx.db.insert("user", {
      name: args.name,
      email: args.email,
      password: args.password,
    });
    return newUser;
  },
});

export const getUserByEmail = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("user")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    return user;
  },
});
