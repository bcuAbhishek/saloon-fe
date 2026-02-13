import { NameChip } from "@/components/cards/name-chip";
import { Calendar } from "@/components/ui/calendar";

interface ServiceItem {
  label: string;
  title: string;
  subtext: string;
  image: string;
  price: number;
}

interface ServiceSelection {
  staff: string;
  date: Date | undefined;
  time: string;
}

interface Step1Props {
  selectedItems: ServiceItem[];
  serviceSelections: Record<string, ServiceSelection>;
  getServiceSelection: (serviceTitle: string) => ServiceSelection;
  updateServiceSelection: (serviceTitle: string, field: keyof ServiceSelection, value: string | Date | undefined) => void;
  timeSlots: string[];
}

const staffList = ["John", "Sarah", "Mike", "Emma", "David"];

export function Step1({
  selectedItems,
  serviceSelections,
  getServiceSelection,
  updateServiceSelection,
  timeSlots,
}: Step1Props) {
  return (
    <>
      {selectedItems.map((service) => {
        const selection = getServiceSelection(service.title);
        return (
          <div key={service.title} className="mb-8 border-b border-border pb-6 last:border-b-0">
            <h5 className="text-lg font-bold text-foreground px-4 mb-4">{service.title}</h5>
            
            <section className="px-4">
              <h6 className="font-bold mb-2">Staff</h6>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {staffList.map((staff) => (
                  <NameChip
                    key={staff}
                    label={staff}
                    onClick={() => updateServiceSelection(service.title, 'staff', staff)}
                    className={selection.staff === staff ? "bg-primary-text text-white" : ""}
                  />
                ))}
              </div>
            </section>
            
            <section className="mt-4 px-4">
              <h6 className="font-bold mb-2">Date</h6>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selection.date}
                  onSelect={(date) => updateServiceSelection(service.title, 'date', date)}
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
                    onClick={() => updateServiceSelection(service.title, 'time', time)}
                    className={selection.time === time ? "bg-primary-text text-white" : ""}
                  />
                ))}
              </div>
            </section>
          </div>
        );
      })}
    </>
  );
}
