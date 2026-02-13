import { useState } from "react";
import Container from "@/layout/container";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Step3Props {
  selectedItem: string;
  selectedStaff: string;
  selectedDate: Date | undefined;
  selectedTime: string;
  totalAmount?: number;
  onNext: () => void;
  onPaymentMethodChange?: (method: string) => void;
}

interface PaymentOption {
  id: string;
  name: string;
  description: string;
  logo: string;
}

const paymentOptions: PaymentOption[] = [
  {
    id: "esewa",
    name: "eSewa",
    description: "Pay with your eSewa wallet",
    logo: "/esewa.jpg",
  },
  {
    id: "khalti",
    name: "Khalti",
    description: "Pay with your Khalti wallet",
    logo: "/khalti.jpg",
  },
];

export function Step3({ selectedItem, selectedStaff, selectedDate, selectedTime, totalAmount = 1000, onNext, onPaymentMethodChange, selectedPayment }: Step3Props & { selectedPayment?: string }) {
  const advanceAmount = totalAmount * 0.2;

  const handlePaymentSelect = (paymentId: string) => {
    onPaymentMethodChange?.(paymentId);
  };

  return (
    <Container className="flex flex-col h-full">
      <div className="">
        <h2 className="text-xl font-bold mb-6">Choose Payment Method</h2>
        <div className="space-y-4">
          {paymentOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handlePaymentSelect(option.id)}
              className={cn(
                "flex items-center justify-between p-4 cursor-pointer ",
                selectedPayment === option.id
                  ? "bg-none border-2 border-primary-text"
                  : "bg-none"
              )}
            >
              <div>
                <h3 className="font-bold text-foreground">{option.name}</h3>
                <p className="text-sm text-primary-text">{option.description}</p>
              </div>
              <div className="w-20 h-12 relative">
                <Image
                  src={option.logo}
                  alt={option.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-foreground">20% Advance</p>
            <p className="text-sm text-primary-text">Rs. {advanceAmount.toLocaleString()}</p>
          </div>
          <p className="text-lg font-semibold text-foreground">Rs. {advanceAmount.toLocaleString()}</p>
        </div>
      </div>
    </Container>
  );
}
