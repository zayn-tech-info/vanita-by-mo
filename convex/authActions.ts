import { action } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import bcrypt from "bcryptjs";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const signup = action({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<Id<"user">> => {
    const existingUser = await ctx.runMutation(api.auth.checkUserExists, { email: args.email });
    if (existingUser) {
      throw new ConvexError("User already exists with this email");
    }
    const hashedPassword = await bcrypt.hash(args.password, 10);
    const newUser = await ctx.runMutation(api.auth.insertUser, {
      name: args.name,
      email: args.email,
      password: hashedPassword,
    });
    return newUser;
  },
});

export const login = action({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args): Promise<Id<"user">> => {
    const user = await ctx.runMutation(api.auth.getUserByEmail, { email: args.email });
    if (!user) {
      throw new ConvexError("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(args.password, user.password);
    if (!isMatch) {
      throw new ConvexError("Invalid email or password");
    }
    return user._id;
  },
});
