"use client";

import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(5).max(60),
  password: z.string().min(5).max(60),
});
