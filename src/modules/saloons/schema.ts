import { z } from "zod";
import { envelopeSchema } from "@/modules/auth/schema";
import {
  publicSaloonDetailResponseSchema,
  publicSaloonListResponseSchema,
  publicServiceResponseSchema,
} from "@/modules/public/schema";

// Re-export from public for consumers that need the full detail shape
export {
  type PublicSaloon,
  type PublicSaloonDetail,
  type PublicService,
} from "@/modules/public/schema";

// ============================================================================
// Envelopes
// ============================================================================

export const saloonListEnvelopeSchema = envelopeSchema(publicSaloonListResponseSchema);
export const saloonDetailEnvelopeSchema = envelopeSchema(publicSaloonDetailResponseSchema);
export const serviceListEnvelopeSchema = envelopeSchema(
  z.array(publicServiceResponseSchema)
);

export type SaloonListEnvelope = z.infer<typeof saloonListEnvelopeSchema>;
export type SaloonDetailEnvelope = z.infer<typeof saloonDetailEnvelopeSchema>;
export type ServiceListEnvelope = z.infer<typeof serviceListEnvelopeSchema>;
