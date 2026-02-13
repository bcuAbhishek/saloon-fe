'use client'

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

interface ServiceItem {
    label: string;
    title: string;
    subtext: string;
    image: string;
    price: number;
}

interface ConfirmationOverlayProps {
    selectedItems: ServiceItem[];
    onConfirm?: (staff: string) => void;
}

interface ServiceSelection {
    staff: string;
    date: Date | undefined;
    time: string;
}

export function ConfirmationOverlay1({ selectedItems, onConfirm }: ConfirmationOverlayProps) {
    const [open, setOpen] = useState(false);
    const [serviceSelections, setServiceSelections] = useState<Record<string, ServiceSelection>>({});
    const [selectedPayment, setSelectedPayment] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [step, setStep] = useState(1); // 1: select, 2: confirmation/next page

    // Initialize selections for new services
    const getServiceSelection = (serviceTitle: string): ServiceSelection => {
        return serviceSelections[serviceTitle] || { staff: '', date: undefined, time: '' };
    };

    const updateServiceSelection = (serviceTitle: string, field: keyof ServiceSelection, value: string | Date | undefined) => {
        setServiceSelections(prev => ({
            ...prev,
            [serviceTitle]: {
                ...getServiceSelection(serviceTitle),
                [field]: value
            }
        }));
    };

    // Compute aggregated values from selected items
    const selectedItemNames = selectedItems.map(i => i.title).join(', ');
    const selectedImage = selectedItems[0]?.image;
    const selectedPrice = selectedItems.reduce((sum, i) => sum + i.price, 0);

    // Get items with their selections for Step2
    const itemsWithSelections = selectedItems.map(item => ({
        ...item,
        staff: getServiceSelection(item.title).staff,
        date: getServiceSelection(item.title).date,
        time: getServiceSelection(item.title).time,
    }));

    const timeSlots = [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
        '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'
    ];

    const handleConfirm = () => {
        // Instead of closing, go to next step
        setStep(2);
        if (onConfirm) {
            const firstStaff = itemsWithSelections[0]?.staff || '';
            onConfirm(firstStaff);
        }
    };

    const handleDrawerOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            setStep(1); // Reset to first step when closing
            setSelectedPayment(''); // Reset payment selection
        }
    };

    return (
        <Drawer open={open} onOpenChange={handleDrawerOpenChange}>
            <DrawerTrigger asChild>
                <Button
                    className="w-full h-14 text-lg font-bold rounded-xl"
                    variant="brand"
                >
                    Continue
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[80vh] flex flex-col">
                <DrawerHeader className="flex items-center justify-between flex-row">
                    <DrawerClose asChild>
                        <button> 
                            <X className="size-6" />
                        </button>
                    </DrawerClose>
                    <DrawerTitle className="font-bold text-xl">
                        {step === 1 ? 'Select Staff & Slot' : 'Booking Confirmation'}
                    </DrawerTitle>
                    <div></div>
                </DrawerHeader>
                <div className="flex-1 overflow-y-auto">
                    {step === 1 && (
                        <>
                            <Step1
                                selectedItems={selectedItems}
                                serviceSelections={serviceSelections}
                                getServiceSelection={getServiceSelection}
                                updateServiceSelection={updateServiceSelection}
                                timeSlots={timeSlots}
                            />
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <Step2
                                itemsWithSelections={itemsWithSelections}
                                onNext={() => setStep(3)}
                                agreed={agreed}
                                setAgreed={setAgreed}
                            />
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <Step3
                                selectedItem={selectedItemNames}
                                selectedStaff={itemsWithSelections[0]?.staff || ''}
                                selectedDate={itemsWithSelections[0]?.date}
                                selectedTime={itemsWithSelections[0]?.time || ''}
                                totalAmount={selectedPrice}
                                selectedPayment={selectedPayment}
                                onPaymentMethodChange={setSelectedPayment}
                                onNext={() => setStep(4)}
                            />
                        </>
                    )}
                    {step === 4 && (
                        <Step4
                            bookedServices={itemsWithSelections}
                            onClose={() => { setOpen(false); setStep(1); }}
                        />
                    )}
                </div>
                {step === 1 && (
                    <DrawerFooter>
                        <Button
                            className="w-full h-14 text-lg font-bold rounded-xl"
                            variant="brand"
                            onClick={handleConfirm}
                        >
                            Confirm Slot
                        </Button>
                    </DrawerFooter>
                )}
                {step === 2 && (
                    <DrawerFooter>
                        <Button
                            className="w-full h-14 text-lg font-bold rounded-xl"
                            variant="brand"
                            onClick={() => setStep(3)}
                            disabled={!agreed}
                        >
                            Next
                        </Button>
                    </DrawerFooter>
                )}
                {step === 3 && (
                    <DrawerFooter>
                        <Button
                            className="w-full h-14 text-lg font-bold rounded-xl"
                            variant="brand"
                            onClick={() => {
                                if (selectedPayment) {
                                    setStep(4);
                                }
                            }}
                            disabled={!selectedPayment}
                        >
                            Pay 20% Advance
                        </Button>
                    </DrawerFooter>
                )}
            </DrawerContent>
        </Drawer>
    );
}
