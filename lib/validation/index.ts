import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(20),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  username:z.string().min(2).max(30),
  password: z.string().min(2).max(20),
});

