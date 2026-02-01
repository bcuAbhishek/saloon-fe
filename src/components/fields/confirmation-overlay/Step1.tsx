import { NameChip } from "@/components/cards/name-chip";
import { Calendar } from "@/components/ui/calendar";

interface Step1Props {
  selectedStaff: string;
  setSelectedStaff: (staff: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  timeSlots: string[];
}

export function Step1({
  selectedStaff,
  setSelectedStaff,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  timeSlots,
}: Step1Props) {
  return (
    <>
      <section className="px-4">
        <h6 className="font-bold mb-2">Staffs</h6>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {["John", "Sarah", "Mike", "Emma", "David"].map((staff) => (
            <NameChip
              key={staff}
              label={staff}
              onClick={() => setSelectedStaff(staff)}
              className={selectedStaff === staff ? "bg-primary text-white" : ""}
            />
          ))}
        </div>
      </section>
      <section className="mt-4 px-4">
        <h6 className="font-bold mb-2">Date</h6>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="[&_[data-selected-single=true]]:bg-white [&_[data-selected-single=true]]:text-primary-text"
          />
        </div>
      </section>
      <section className="mt-4 px-4">
        <h6 className="font-bold mb-2">Time</h6>
        <div className="grid grid-cols-4 gap-2">
          {timeSlots.map((time) => (
            <NameChip
              key={time}
              label={time}
              onClick={() => setSelectedTime(time)}
              className={selectedTime === time ? "bg-primary text-white" : ""}
            />
          ))}
        </div>
      </section>
    </>
  );
}
