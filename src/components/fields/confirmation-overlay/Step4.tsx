import { useRouter } from "next/navigation";
import Container from "@/layout/container";
import { Button } from "@/components/ui/button";
import { ActionCard } from "@/components/cards/action-card";

interface Step4Props {
  selectedItem: string;
  selectedStaff: string;
  selectedDate: Date | undefined;
  selectedTime: string;
  serviceImage?: string;
  bookingId?: string;
  onClose: () => void;
}

export function Step4({ selectedItem, selectedStaff, selectedDate, selectedTime, serviceImage, bookingId = "1234567890", onClose }: Step4Props) {
  const router = useRouter();

  const handleViewAppointments = () => {
    onClose();
    router.push("/dashboard/customer-dashboard");
  };

  return (
    <Container className="flex flex-col items-center text-center h-full">
      <h2 className="text-2xl font-bold mb-2">Booking Confirmed</h2>
      <p className="text-primary-text mb-6">
        Your appointment is confirmed. We're excited to see you!
      </p>

      <ActionCard
        image={serviceImage || "/placeholder.png"}
        title={selectedItem}
        metadata={[
          `With ${selectedStaff}, ${selectedTime}`,
          `Booking ID: ${bookingId}`
        ]}
      />

      <div className=" w-full pt-6">
        <Button
          variant="secondary"
          className="w-full h-14 text-lg font-bold rounded-xl"
          onClick={handleViewAppointments}
        >
          View My Appointments
        </Button>
      </div>
    </Container>
  );
}
