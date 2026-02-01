"use client";

import { cn } from "@/lib/utils";

interface BillingItem {
  name: string;
  price: number;
}

interface BillingSummaryProps {
  items: BillingItem[];
  discount?: number;
  currencySymbol?: string;
  className?: string;
}


export default function BillingSummary({
  items,
  discount = 0,
  currencySymbol = "Rs.",
  className,
}: BillingSummaryProps) {
  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal - discount;

  return (
    <div className={cn("w-full space-y-6 p-6 ", className)}>
      <h2 className="text-2xl font-bold text-foreground text-start">Pricing</h2>

      <div className="space-y-4">
        {/* Dynamic Items List */}
        {items.map((item, index) => (
          <div key={`${item.name}-${index}`} className="flex justify-between items-center text-lg">
            <span className="text-primary-text ">{item.name}</span>
            <span className="text-foreground/80">
              {currencySymbol}{item.price.toLocaleString()}
            </span>
          </div>
        ))}

      

        {/* Subtotal */}
        <div className="flex justify-between items-center text-lg">
          <span className="text-primary-text ">Subtotal</span>
          <span className="text-foreground/80">
            {currencySymbol}{subtotal.toLocaleString()}
          </span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between items-center text-lg">
            <span className="text-primary-text ">Discount</span>
            <span className="text-foreground/80">
              {currencySymbol}{discount.toLocaleString()}
            </span>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center text-xl pt-2">
          <span className="text-primary-text">Total</span>
          <span className="text-foreground">
            {currencySymbol}{total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}