import Container from "@/layout/container";
import DynamicServiceCard from "@/components/cards/dynamic-service-card";
import BillingSummary from "@/components/features/billing-summary";
import BillingCheckAgreement from "@/components/features/billing-check-agreement";
import { useState } from "react";

interface Step2Props {
  selectedStaff: string;
  selectedDate: Date | undefined;
  selectedTime: string;
  selectedService?: string;
  serviceImage?: string;
  serviceLabel?: string;
  servicePrice?: number;
  onNext: () => void;
}

export function Step2({ selectedStaff, selectedDate, selectedTime, selectedService, serviceImage, serviceLabel, servicePrice, onNext }: Step2Props) {
  const [agreed, setAgreed] = useState(false);
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const billingItems = [
    { name: selectedService || "Service", price: servicePrice || 0 },
  ];

  return (
    <Container>
        
            <DynamicServiceCard
                label={serviceLabel || "Selected Service"}
                title={selectedService || "Service"}
                description={`With ${selectedStaff}`}
                image={serviceImage || "/placeholder.png"}
                badgeText={`${formatDate(selectedDate)} · ${selectedTime || ""}`}
            />
            
            <BillingSummary items={billingItems} />
            
            {/* <BillingCheckAgreement 
                checked={agreed}
                onCheckedChange={setAgreed}
            /> */}
        
    </Container>
  )
}

