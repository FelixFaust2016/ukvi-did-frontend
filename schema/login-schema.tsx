"use client";

import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(5, "Email must be at least 5 characters")
    .max(60, "Email must not exceed 60 characters")
    .email("Invalid email format"), // Ensures valid email
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(60, "Password must not exceed 60 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});
