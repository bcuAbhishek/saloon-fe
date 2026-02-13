import { useRouter } from "next/navigation";
import Container from "@/layout/container";
import { Button } from "@/components/ui/button";
import { ActionCard } from "@/components/cards/action-card";


interface BookedService {
  title: string;
  staff: string;
  date: Date | undefined;
  time: string;
  image?: string;
}

interface Step4Props {
  bookedServices: BookedService[];
  bookingId?: string;
  onClose: () => void;
}

export function Step4({ bookedServices, bookingId = "1234567890", onClose }: Step4Props) {
  const router = useRouter();

  const handleViewAppointments = () => {
    onClose();
    router.push("/dashboard/customer-dashboard");
  };

  return (
    <Container className="flex flex-col items-center text-center h-full px-4 mb-2">
      <h2 className="text-2xl font-bold mb-2">Booking Confirmed</h2>
      <p className="text-primary-text mb-6">
        Your appointment is confirmed. We're excited to see you!
      </p>

      <div className="w-full flex flex-col gap-4">
        {bookedServices.map((service, idx) => (
          <ActionCard
            key={service.title + idx}
            image={service.image || "/placeholder.png"}
            title={service.title}
            metadata={[
              `With ${service.staff}, ${service.time}`,
              `Booking ID: ${bookingId}`
            ]}
          />
        ))}
      </div>

      <div className=" w-full pt-6">
        <Button
          variant="secondary"
          className="w-full h-14 text-lg font-bold rounded-xl mb-4"
          onClick={handleViewAppointments}
        >
          View My Appointments
        </Button>
      </div>
    </Container>
  );
}
