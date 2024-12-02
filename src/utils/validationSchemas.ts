import { z } from "zod";

export const postRegisterSchema = z.object({
  success: z.boolean(),
  method: z.enum(["email", "google"]),
  registrationTime: z.number(),
  location: z.string(),
});

export const getSchema = z.object({
  date_from: z.string().datetime(),
  date_to: z.string().datetime(),
});

export const postLoginSchema = z.object({
  success: z.boolean(),
  method: z.enum(["email", "google"]),
  loginTime: z.number(),
  location: z.string(),
});

export const postBlockSchema = z.object({
  reason: z.string(),
  blockDuration: z.number(),
});

export const postRecoverPasswordSchema = z.object({
  success: z.boolean(),
  recoveryTime: z.number(),
});

export const newApiKeySchema = z.object({
  apiKey: z.string(),
});
