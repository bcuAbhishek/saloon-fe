"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { formatTimeFromIso, generateTimeSlots } from "@/lib/booking-utils";
import type { PublicSaloonDetail } from "@/modules/public/schema";
import { useBookAppointmentMutation } from "@/modules/user/mutation";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step4 } from "./Step4";

interface ServiceItem {
  id: string;
  label: string;
  title: string;
  subtext: string;
  image: string;
  price: number;
  durationInMinutes: number;
}

interface ConfirmationOverlayProps {
  saloonId: string;
  saloon: PublicSaloonDetail | null | undefined;
  selectedItems: ServiceItem[];
  onConfirm?: () => void;
}

/**
 * Builds ISO datetime in saloon local time (Asia/Kathmandu).
 * Avoids UTC conversion so backend receives the time the user selected.
 */
function buildScheduledAt(date: Date, timeStr: string): string {
  const [hours, minutes] = parseTimeString(timeStr);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(hours).padStart(2, "0");
  const min = String(minutes).padStart(2, "0");
  return `${y}-${m}-${d}T${h}:${min}:00`;
}

function parseTimeString(timeStr: string): [number, number] {
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    if (match[3].toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (match[3].toUpperCase() === "AM" && hours === 12) hours = 0;
    return [hours, minutes];
  }
  return [9, 0];
}

interface ServiceSelection {
  date: Date | undefined;
  time: string;
}

const FALLBACK_TIME_SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
];

export function ConfirmationOverlay1({
  saloonId,
  saloon,
  selectedItems,
  onConfirm,
}: ConfirmationOverlayProps) {
  const [open, setOpen] = useState(false);
  const [serviceSelections, setServiceSelections] = useState<
    Record<string, ServiceSelection>
  >({});
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState(1);
  const [bookedIds, setBookedIds] = useState<string[]>([]);

  const bookMutation = useBookAppointmentMutation();

  // Initialize selections for new services
  const getServiceSelection = (serviceTitle: string): ServiceSelection => {
    return serviceSelections[serviceTitle] || { date: undefined, time: "" };
  };

  const updateServiceSelection = (
    serviceTitle: string,
    field: keyof ServiceSelection,
    value: string | Date | undefined
  ) => {
    setServiceSelections((prev) => ({
      ...prev,
      [serviceTitle]: {
        ...getServiceSelection(serviceTitle),
        [field]: value,
      },
    }));
  };

  // Compute aggregated values from selected items
  const selectedItemNames = selectedItems.map((i) => i.title).join(", ");
  const selectedImage = selectedItems[0]?.image;
  const selectedPrice = selectedItems.reduce((sum, i) => sum + i.price, 0);

  // Get items with their selections for Step2
  const itemsWithSelections = selectedItems.map((item) => ({
    ...item,
    date: getServiceSelection(item.title).date,
    time: getServiceSelection(item.title).time,
  }));

  const timeSlots = useMemo(() => {
    const opening = saloon?.openingHour;
    const closing = saloon?.closingHour;
    const maxDuration = Math.max(
      ...selectedItems.map((i) => i.durationInMinutes),
      30
    );
    if (opening && closing) {
      const slots = generateTimeSlots(opening, closing, maxDuration, 30);
      return slots.length > 0 ? slots : FALLBACK_TIME_SLOTS;
    }
    return FALLBACK_TIME_SLOTS;
  }, [saloon?.openingHour, saloon?.closingHour, selectedItems]);

  const canConfirmSlot = itemsWithSelections.every(
    (item) => item.date && item.time
  );

  const handleConfirm = () => {
    if (!canConfirmSlot) return;
    setStep(2);
  };

  const handleDrawerOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setStep(1);
      setBookedIds([]);
    }
  };

  const handleBookAppointment = async () => {
    const bookings = itemsWithSelections
      .filter((item) => item.date)
      .map((item) => ({
        saloonId,
        serviceId: item.id,
        scheduledAt: buildScheduledAt(item.date!, item.time || "9:00 AM"),
      }));

    if (bookings.length === 0) return;

    try {
      const results = await Promise.all(
        bookings.map((b) => bookMutation.mutateAsync(b))
      );
      setBookedIds(
        results.map((r) => r.data?.id).filter((id): id is string => !!id)
      );
      setStep(4);
    } catch {
      // Error handled by mutation
    }
  };

  const hasSelectedItems = selectedItems.length > 0;

  return (
    <Drawer open={open} onOpenChange={handleDrawerOpenChange}>
      <DrawerTrigger asChild>
        <Button
          className="w-full h-14 text-lg font-bold rounded-xl"
          variant="brand"
          disabled={!hasSelectedItems}
        >
          Continue
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh] flex flex-col">
        <DrawerHeader className="flex items-center justify-between flex-row">
          <DrawerClose asChild>
            <button>
              <X className="size-6" />
            </button>
          </DrawerClose>
          <div className="flex flex-col items-center gap-0.5">
            <DrawerTitle className="font-bold text-xl">
              {step === 1 ? "Select Date & Time" : "Booking Confirmation"}
            </DrawerTitle>
            {step === 1 && saloon?.openingHour && saloon?.closingHour && (
              <p className="text-xs text-muted-foreground">
                Open {formatTimeFromIso(saloon.openingHour)} –{" "}
                {formatTimeFromIso(saloon.closingHour)}
              </p>
            )}
          </div>
          <div></div>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          {step === 1 && (
            <>
              <Step1
                selectedItems={selectedItems}
                serviceSelections={serviceSelections}
                getServiceSelection={getServiceSelection}
                updateServiceSelection={updateServiceSelection}
                timeSlots={timeSlots}
              />
            </>
          )}
          {step === 2 && (
            <>
              <Step2
                itemsWithSelections={itemsWithSelections}
                totalAmount={selectedPrice}
                agreed={agreed}
                setAgreed={setAgreed}
              />
            </>
          )}
          {step === 4 && (
            <Step4
              bookedServices={itemsWithSelections}
              bookingId={bookedIds[0]}
              bookingIds={bookedIds}
              onClose={() => {
                setOpen(false);
                setStep(1);
              }}
            />
          )}
        </div>
        {step === 1 && (
          <DrawerFooter>
            <Button
              className="w-full h-14 text-lg font-bold rounded-xl"
              variant="brand"
              onClick={handleConfirm}
              disabled={!canConfirmSlot}
            >
              Confirm Slot
            </Button>
          </DrawerFooter>
        )}
        {step === 2 && (
          <DrawerFooter>
            <Button
              className="w-full h-14 text-lg font-bold rounded-xl"
              variant="brand"
              onClick={handleBookAppointment}
              disabled={!agreed || bookMutation.isPending}
            >
              {bookMutation.isPending ? "Booking..." : "Book Appointment"}
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
