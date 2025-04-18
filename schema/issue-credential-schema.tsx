"use client";

import { z } from "zod";

export const VisaTypeSchema = z.object({
  visaType: z.string().min(5).max(20),
});

export const IssueVisaSchema = z.object({
  visaID: z.string().min(5).max(60),
  firstName: z.string().min(3).max(60),
  middleName: z.string().min(3).max(60),
  lastName: z.string().min(3).max(60),
  dateOfBirth: z.string().date(),
  nationality: z.string().min(2).max(60),
  passportNumber: z.string().min(5).max(20),
  passportExpiryDate: z.string().date(),
  gender: z.enum(["male", "female", "other"]),
  placeOfBirth: z.string().min(2).max(100),
});
