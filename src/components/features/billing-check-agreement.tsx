"use client";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface BillingCheckAgreementProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  title?: string;
  description?: string;
  agreementText?: string;
  className?: string;
}

export default function BillingCheckAgreement({
  checked = false,
  onCheckedChange,
  title = "Policy",
  description = "Please review the policy below before proceeding with your booking. By checking the box, you agree to the terms and conditions.",
  agreementText = "I agree to the cancellation policy and understand that a 20% advance payment is required to secure my booking.",
  className,
}: BillingCheckAgreementProps) {
  return (
    <div className={cn("w-full space-y-4 p-6", className)}>
      <h2 className="text-xl font-bold text-foreground text-start">{title}</h2>

      <p className=" text-base leading-relaxed">
        {description}
      </p>

      <div className="flex items-start gap-3 pt-2">
        <Checkbox
          id="agreement"
          checked={checked}
          onCheckedChange={(value) => onCheckedChange?.(value as boolean)}
          className="mt-1"
        />
        <label
          htmlFor="agreement"
          className="text-base leading-relaxed cursor-pointer"
        >
          {agreementText}
        </label>
      </div>
    </div>
  );
}
