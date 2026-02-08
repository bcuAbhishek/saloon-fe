import { z } from "zod";
import { envelopeSchema } from "../auth/schema";

// ============================================================================
// Enums
// ============================================================================

export const AppointmentStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  STARTED: "STARTED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type AppointmentStatusType = keyof typeof AppointmentStatus;

// ============================================================================
// Brief Schemas
// ============================================================================

export const saloonBriefSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
});

export const serviceBriefSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
  durationInMinutes: z.number(),
});

export const staffBriefSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  specialization: z.string().nullable().optional(),
});

// ============================================================================
// Appointment Schemas
// ============================================================================

export const bookAppointmentSchema = z.object({
  saloonId: z.string().uuid(),
  serviceId: z.string().uuid(),
  scheduledAt: z.string().datetime(), // ISO string
  notes: z.string().max(500).optional().nullable(),
});

export const userAppointmentResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  saloonId: z.string().uuid(),
  serviceId: z.string().uuid(),
  staffId: z.string().uuid().nullable().optional(),
  scheduledAt: z.string().datetime(),
  status: z.nativeEnum(AppointmentStatus), // Or z.string() if backend sends lowercase
  notes: z.string().nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  saloon: saloonBriefSchema.optional().nullable(),
  service: serviceBriefSchema.optional().nullable(),
  staff: staffBriefSchema.optional().nullable(),
});

// ============================================================================
// Feedback Schemas
// ============================================================================

export const feedbackCreateSchema = z.object({
  appointmentId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(1000).optional().nullable(),
});

export const feedbackResponseSchema = z.object({
  id: z.string().uuid(),
  appointmentId: z.string().uuid(),
  userId: z.string().uuid(),
  saloonId: z.string().uuid(),
  rating: z.number(),
  comment: z.string().nullable().optional(),
  createdAt: z.string().datetime(),
});

// ============================================================================
// Types
// ============================================================================

export type BookAppointment = z.infer<typeof bookAppointmentSchema>;
export type UserAppointment = z.infer<typeof userAppointmentResponseSchema>;
export type FeedbackCreate = z.infer<typeof feedbackCreateSchema>;
export type FeedbackResponse = z.infer<typeof feedbackResponseSchema>;

// ============================================================================
// Envelopes
// ============================================================================

export const appointmentEnvelopeSchema = envelopeSchema(userAppointmentResponseSchema);
export const appointmentListEnvelopeSchema = envelopeSchema(
  z.object({
    appointments: z.array(userAppointmentResponseSchema),
    total: z.number(),
  })
);

export const feedbackEnvelopeSchema = envelopeSchema(feedbackResponseSchema);
export const feedbackListEnvelopeSchema = envelopeSchema(
  z.object({
    feedbacks: z.array(feedbackResponseSchema),
    total: z.number(),
    averageRating: z.number().nullable().optional(),
  })
);

export type AppointmentEnvelope = z.infer<typeof appointmentEnvelopeSchema>;
export type AppointmentListEnvelope = z.infer<typeof appointmentListEnvelopeSchema>;
export type FeedbackEnvelope = z.infer<typeof feedbackEnvelopeSchema>;
export type FeedbackListEnvelope = z.infer<typeof feedbackListEnvelopeSchema>;
