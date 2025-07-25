import { z } from "zod";

const registerUserSchema = z.object({
  name: z.string(),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),

  avatarImageFile: z.instanceof(File).optional(),
  avatarImage: z.string().optional(),

  password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Must be 5 or more characters long" }),
});

const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

type RegisterUserType = z.infer<typeof registerUserSchema>;
export { registerUserSchema, loginSchema, RegisterUserType };
