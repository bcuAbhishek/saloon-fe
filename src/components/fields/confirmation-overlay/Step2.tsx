import Container from "@/layout/container";
import DynamicServiceCard from "@/components/cards/dynamic-service-card";
import BillingCheckAgreement from "@/components/features/billing-check-agreement";

interface ItemWithSelection {
  label: string;
  title: string;
  subtext: string;
  image: string;
  price: number;
  date: Date | undefined;
  time: string;
}

interface Step2Props {
  itemsWithSelections: ItemWithSelection[];
  totalAmount: number;
  agreed?: boolean;
  setAgreed?: (val: boolean) => void;
}

export function Step2({ itemsWithSelections, totalAmount, agreed = false, setAgreed }: Step2Props) {
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <Container>
        {itemsWithSelections.map((item) => (
            <DynamicServiceCard
                key={item.title}
                label={item.label || "Selected Service"}
                title={item.title || "Service"}
                image={item.image || "/placeholder.png"}
                badgeText={`${formatDate(item.date)} · ${item.time || ""}`}
                className="mb-4"
            />
        ))}
            
        <div className="w-full p-6 space-y-4">
          <h2 className="text-2xl font-bold text-foreground text-start">Payment</h2>
          <div className="flex justify-between items-center text-xl pt-2 border-t">
            <span className="text-primary-text">Total Amount</span>
            <span className="text-foreground font-bold">
              Rs. {totalAmount.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-primary-text">
            Payment will be made physically at the saloon
          </p>
        </div>
               
        <BillingCheckAgreement 
          checked={agreed}
          onCheckedChange={setAgreed}
        />
        
    </Container>
  )
}

