import Container from "@/layout/container";
import DynamicServiceCard from "@/components/cards/dynamic-service-card";
import BillingSummary from "@/components/features/billing-summary";
import BillingCheckAgreement from "@/components/features/billing-check-agreement";

interface ItemWithSelection {
  label: string;
  title: string;
  subtext: string;
  image: string;
  price: number;
  staff: string;
  date: Date | undefined;
  time: string;
}

interface Step2Props {
  itemsWithSelections: ItemWithSelection[];
  onNext: () => void;
  agreed?: boolean;
  setAgreed?: (val: boolean) => void;
}

export function Step2({ itemsWithSelections, onNext, agreed = false, setAgreed }: Step2Props) {
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const billingItems = itemsWithSelections.map(item => ({
    name: item.title,
    price: item.price,
  }));

  return (
    <Container>
        {itemsWithSelections.map((item) => (
            <DynamicServiceCard
                key={item.title}
                label={item.label || "Selected Service"}
                title={item.title || "Service"}
                description={`With ${item.staff}`}
                image={item.image || "/placeholder.png"}
                badgeText={`${formatDate(item.date)} · ${item.time || ""}`}
                className="mb-4"
            />
        ))}
            
        <BillingSummary items={billingItems} />
               
        <BillingCheckAgreement 
          checked={agreed}
          onCheckedChange={setAgreed}
        />
        
    </Container>
  )
}

