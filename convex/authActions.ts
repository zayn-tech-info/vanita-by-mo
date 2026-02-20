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
