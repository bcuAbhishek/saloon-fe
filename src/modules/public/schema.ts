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

export type PublicCategory = z.infer<typeof publicCategoryResponseSchema>;

// ============================================================================
// Public Saloon Schemas
// ============================================================================

export const publicSaloonImageSchema = z.object({
  id: z.string().uuid(),
  imageUrl: z.string().url(),
  isThumbnail: z.boolean(),
});

export type PublicSaloonImage = z.infer<typeof publicSaloonImageSchema>;

export const publicSaloonResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  description: z.string().nullable().optional(),
  openingHour: z.string().nullable().optional(), // DateTime as string
  closingHour: z.string().nullable().optional(), // DateTime as string
  isVerified: z.boolean(),
  images: z.array(publicSaloonImageSchema).default([]),
});

export type PublicSaloon = z.infer<typeof publicSaloonResponseSchema>;

export const publicSaloonDetailResponseSchema = publicSaloonResponseSchema.extend({
  servicesCount: z.number().int().default(0),
  averageRating: z.number().nullable().optional(),
});

export type PublicSaloonDetail = z.infer<typeof publicSaloonDetailResponseSchema>;

export const publicSaloonListResponseSchema = z.object({
  saloons: z.array(publicSaloonResponseSchema),
  total: z.number().int(),
});

export type PublicSaloonListResponse = z.infer<typeof publicSaloonListResponseSchema>;

// ============================================================================
// Public Service Schemas
// ============================================================================

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

export type PublicService = z.infer<typeof publicServiceResponseSchema>;

export const publicServiceListResponseSchema = z.object({
  services: z.array(publicServiceResponseSchema),
  total: z.number().int(),
});

export type PublicServiceListResponse = z.infer<typeof publicServiceListResponseSchema>;

//Params Schemas
export const getSaloonsParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
});

export type GetSaloonsParams = z.infer<typeof getSaloonsParamsSchema>;

export const getServicesParamsSchema = z.object({
  saloonId: z.string().uuid().optional(),
  categoryId: z.string().uuid().optional(),
  search: z.string().optional(),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
});

export type GetServicesParams = z.infer<typeof getServicesParamsSchema>;

// ============================================================================
// Envelopes
// ============================================================================

export const categoryListEnvelopeSchema = envelopeSchema(z.array(publicCategoryResponseSchema));
export const categoryDetailEnvelopeSchema = envelopeSchema(publicCategoryResponseSchema);

export const saloonListEnvelopeSchema = envelopeSchema(publicSaloonListResponseSchema);
export const saloonDetailEnvelopeSchema = envelopeSchema(publicSaloonDetailResponseSchema);

export const serviceListEnvelopeSchema = envelopeSchema(publicServiceListResponseSchema);
export const serviceDetailEnvelopeSchema = envelopeSchema(publicServiceResponseSchema);
export const serviceArrayEnvelopeSchema = envelopeSchema(z.array(publicServiceResponseSchema));


export type CategoryListEnvelope = z.infer<typeof categoryListEnvelopeSchema>;
export type CategoryDetailEnvelope = z.infer<typeof categoryDetailEnvelopeSchema>;

export type SaloonListEnvelope = z.infer<typeof saloonListEnvelopeSchema>;
export type SaloonDetailEnvelope = z.infer<typeof saloonDetailEnvelopeSchema>;

export type ServiceListEnvelope = z.infer<typeof serviceListEnvelopeSchema>;
export type ServiceDetailEnvelope = z.infer<typeof serviceDetailEnvelopeSchema>;
export type ServiceArrayEnvelope = z.infer<typeof serviceArrayEnvelopeSchema>;
