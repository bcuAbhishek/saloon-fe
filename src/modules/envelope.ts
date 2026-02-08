import { z } from "zod";

export const createEnvelopeSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: z.union([dataSchema, z.array(dataSchema)]).optional(),
    detail: z.string(),
    statusCode: z.number().int(),
    errorCode: z.string().optional(),
  });

export type Envelope<T> = z.infer<ReturnType<typeof createEnvelopeSchema<z.ZodType<T>>>>;
