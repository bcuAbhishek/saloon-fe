import { z } from "zod";
import { envelopeSchema } from "../auth/schema";

// ============================================================================
// Enums
// ============================================================================

export const RecipientType = {
  USER: "USER",
  SALOON: "SALOON",
} as const;

export const NotificationType = {
  GENERAL: "GENERAL",
  APPOINTMENT_REQUEST: "APPOINTMENT_REQUEST",
  APPOINTMENT_ACCEPTED: "APPOINTMENT_ACCEPTED",
  APPOINTMENT_CANCELLED: "APPOINTMENT_CANCELLED",
  APPOINTMENT_REMINDER: "APPOINTMENT_REMINDER",
  SYSTEM: "SYSTEM",
} as const;

export type RecipientTypeEnum = keyof typeof RecipientType;
export type NotificationTypeEnum = keyof typeof NotificationType;

// ============================================================================
// Notification Schemas
// ============================================================================

export const notificationResponseSchema = z.object({
  id: z.string().uuid(),
  recipientType: z.nativeEnum(RecipientType),
  recipientId: z.string().uuid(),
  title: z.string(),
  message: z.string(),
  notificationType: z.nativeEnum(NotificationType).or(z.string()), // Fallback for unknown types
  isRead: z.boolean(),
  referenceId: z.string().uuid().nullable().optional(),
  createdAt: z.string().datetime(),
});

export const markNotificationsReadSchema = z.object({
  notificationIds: z.array(z.string().uuid()),
});

// ============================================================================
// Types
// ============================================================================

export type Notification = z.infer<typeof notificationResponseSchema>;
export type MarkNotificationsRead = z.infer<typeof markNotificationsReadSchema>;

// ============================================================================
// Envelopes
// ============================================================================

export const notificationListEnvelopeSchema = envelopeSchema(
  z.object({
    notifications: z.array(notificationResponseSchema),
    total: z.number(),
    unreadCount: z.number(),
  })
);

export const unreadCountEnvelopeSchema = envelopeSchema(
  z.object({
    unreadCount: z.number(),
  })
);

export const markReadEnvelopeSchema = envelopeSchema(
  z.object({
    markedCount: z.number(),
  })
);

export type NotificationListEnvelope = z.infer<typeof notificationListEnvelopeSchema>;
export type UnreadCountEnvelope = z.infer<typeof unreadCountEnvelopeSchema>;
export type MarkReadEnvelope = z.infer<typeof markReadEnvelopeSchema>;
