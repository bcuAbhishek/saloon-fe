import { z } from "zod";

// ============================================================================
// Envelope Type (matches backend Pydantic model)
// ============================================================================

export const envelopeSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema.nullable().optional(),
    detail: z.string(),
    statusCode: z.number(),
  });

export type Envelope<T> = {
  data: T | null | undefined;
  detail: string;
  statusCode: number;
};

// ============================================================================
// User Response Schema
// ============================================================================

export const userResponseSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().nullable().optional(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;

// ============================================================================
// Envelope with User Response
// ============================================================================

export const userEnvelopeSchema = envelopeSchema(userResponseSchema);

export type UserEnvelope = z.infer<typeof userEnvelopeSchema>;

// ============================================================================
// Authentication Request Schemas
// ============================================================================

export const userRegisterSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
});

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
});

// ============================================================================
// Update Profile Schema
// ============================================================================

export const updateProfileSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
});

// ============================================================================
// Type Exports
// ============================================================================

export type UserRegister = z.infer<typeof userRegisterSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
export type ChangePassword = z.infer<typeof changePasswordSchema>;
export type UpdateProfile = z.infer<typeof updateProfileSchema>;
