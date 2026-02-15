/**
 * Extracts time (HH:mm) from time string or ISO datetime and formats for display.
 * Handles: "09:30:00", "21:30:00", "2026-02-13T06:30:00"
 */
export function formatTimeFromIso(iso: string): string {
  const match = iso.match(/(?:T)?(\d{1,2}):(\d{2})/);
  if (!match) return "";
  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  if (hours === 0) return `12:${String(minutes).padStart(2, "0")} AM`;
  if (hours === 12) return `12:${String(minutes).padStart(2, "0")} PM`;
  if (hours < 12) return `${hours}:${String(minutes).padStart(2, "0")} AM`;
  return `${hours - 12}:${String(minutes).padStart(2, "0")} PM`;
}

/**
 * Parses time string (HH:mm or HH:mm:ss) or ISO datetime; returns minutes from midnight.
 */
function parseIsoToMinutes(iso: string): number {
  const match = iso.match(/(?:T)?(\d{1,2}):(\d{2})/);
  if (!match) return 0;
  return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
}

/**
 * Formats minutes from midnight (0–1439) to "9:00 AM" style string.
 */
function minutesToDisplay(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  if (h === 0) return `12:${String(m).padStart(2, "0")} AM`;
  if (h === 12) return `12:${String(m).padStart(2, "0")} PM`;
  if (h < 12) return `${h}:${String(m).padStart(2, "0")} AM`;
  return `${h - 12}:${String(m).padStart(2, "0")} PM`;
}

const MINUTES_PER_DAY = 24 * 60;
const DEFAULT_SLOT_INTERVAL = 30;

/**
 * Generates time slots between opening and closing hours.
 * Slots are spaced by interval; last slot ensures service duration fits before closing.
 * Handles overnight ranges (e.g. 9:30 PM – 6:30 AM).
 */
export function generateTimeSlots(
  openingIso: string,
  closingIso: string,
  maxDurationMinutes: number,
  slotIntervalMinutes: number = DEFAULT_SLOT_INTERVAL
): string[] {
  let openMin = parseIsoToMinutes(openingIso);
  let closeMin = parseIsoToMinutes(closingIso);

  if (closeMin <= openMin) {
    closeMin += MINUTES_PER_DAY;
  }

  const slots: string[] = [];
  const lastSlotEnd = closeMin - maxDurationMinutes;

  for (let m = openMin; m <= lastSlotEnd; m += slotIntervalMinutes) {
    slots.push(minutesToDisplay(m % MINUTES_PER_DAY));
  }

  return slots;
}
