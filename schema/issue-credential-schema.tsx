"use client";

import { z } from "zod";

const formSchema = z.object({
  visaID: z.string().min(5).max(60),
  firstName: z.string().min(3).max(60),
  lastName: z.string().min(3).max(60),
  dateOfBirth: z.string().datetime(),
  nationality: z.string(),
  passportNumber: z.string(),
  passportExpiryDate: z.string(),
  gender: z.string(),
  placeOfBirth: z.string(),
});
