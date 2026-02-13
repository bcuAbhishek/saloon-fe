import { z } from "zod";
import { envelopeSchema } from "../auth/schema";

// ============================================================================
// Public Saloon Schemas
// ============================================================================

export const publicSaloonImageSchema = z.object({
  id: z.string().uuid(),
  imageUrl: z.string(),
  isThumbnail: z.boolean(),
});

export const publicSaloonResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  description: z.string().nullable().optional(),
  openingHour: z.string().nullable().optional(),
  closingHour: z.string().nullable().optional(),
  isVerified: z.boolean(),
  images: z.array(publicSaloonImageSchema).optional().nullable(),
  servicesCount: z.number().optional(),
  averageRating: z.number().nullable().optional(),
});

export const publicCategoryResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
});

export const publicServiceResponseSchema = z.object({
  id: z.string().uuid(),
  saloonId: z.string().uuid(),
  name: z.string(),
  categoryId: z.string().uuid(),
  category: publicCategoryResponseSchema.nullable().optional(),
  description: z.string().nullable().optional(),
  price: z.number(),
  imageUrl: z.string().nullable().optional(),
  durationInMinutes: z.number(),
});

// ============================================================================
// Types
// ============================================================================

export type PublicSaloon = z.infer<typeof publicSaloonResponseSchema>;
export type PublicService = z.infer<typeof publicServiceResponseSchema>;

// ============================================================================
// Envelopes
// ============================================================================

export const saloonListEnvelopeSchema = envelopeSchema(z.array(publicSaloonResponseSchema));
export const saloonDetailEnvelopeSchema = envelopeSchema(publicSaloonResponseSchema);
export const serviceListEnvelopeSchema = envelopeSchema(z.array(publicServiceResponseSchema));

export type SaloonListEnvelope = z.infer<typeof saloonListEnvelopeSchema>;
export type SaloonDetailEnvelope = z.infer<typeof saloonDetailEnvelopeSchema>;
export type ServiceListEnvelope = z.infer<typeof serviceListEnvelopeSchema>;
