import { z } from "zod";
import { envelopeSchema } from "../auth/schema";

// ============================================================================
// Public Category Schemas
// ============================================================================

export const publicCategoryResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
});

// ============================================================================
// Public Service Schemas
// ============================================================================

export const publicServiceResponseSchema = z.object({
  id: z.string().uuid(),
  saloonId: z.string().uuid(),
  name: z.string(),
  categoryId: z.string().uuid(),
  category: publicCategoryResponseSchema.optional().nullable(),
  description: z.string().nullable().optional(),
  price: z.number(),
  imageUrl: z.string().nullable().optional(),
  durationInMinutes: z.number(),
});

// ============================================================================
// Types
// ============================================================================

export type PublicCategory = z.infer<typeof publicCategoryResponseSchema>;
export type PublicService = z.infer<typeof publicServiceResponseSchema>;

// ============================================================================
// Envelopes
// ============================================================================

export const categoryListEnvelopeSchema = envelopeSchema(z.array(publicCategoryResponseSchema));
export const categoryDetailEnvelopeSchema = envelopeSchema(publicCategoryResponseSchema);
export const serviceListEnvelopeSchema = envelopeSchema(z.array(publicServiceResponseSchema));
export const serviceDetailEnvelopeSchema = envelopeSchema(publicServiceResponseSchema);

export type CategoryListEnvelope = z.infer<typeof categoryListEnvelopeSchema>;
export type CategoryDetailEnvelope = z.infer<typeof categoryDetailEnvelopeSchema>;
export type ServiceListEnvelope = z.infer<typeof serviceListEnvelopeSchema>;
export type ServiceDetailEnvelope = z.infer<typeof serviceDetailEnvelopeSchema>;
