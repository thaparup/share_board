import { z } from "zod";

const registerUserSchema = z.object({
  name: z.string(),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  avatarImage: z.string().optional(),

  password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Must be 5 or more characters long" }),
});

export { registerUserSchema };
