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

interface ConfirmationOverlayProps {
    selectedItem: string;
    selectedImage?: string;
    selectedLabel?: string;
    selectedPrice?: number;
    onConfirm?: (staff: string) => void;
}

export function ConfirmationOverlay1({ selectedItem, selectedImage, selectedLabel, selectedPrice, onConfirm }: ConfirmationOverlayProps) {
    const [open, setOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState('');
    const [step, setStep] = useState(1); // 1: select, 2: confirmation/next page

    const timeSlots = [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
        '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'
    ];

    const handleConfirm = () => {
        // Instead of closing, go to next step
        setStep(2);
        if (onConfirm && selectedStaff) {
            onConfirm(selectedStaff);
        }
    };

    const handleDrawerOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            setStep(1); // Reset to first step when closing
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
            <DrawerContent className="h-[80vh]">
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
                <>
                    {step === 1 && (
                        <>
                            <Step1
                                selectedStaff={selectedStaff}
                                setSelectedStaff={setSelectedStaff}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                selectedTime={selectedTime}
                                setSelectedTime={setSelectedTime}
                                timeSlots={timeSlots}
                            />
                            <DrawerFooter>
                                <Button
                                    className="w-full h-14 text-lg font-bold rounded-xl"
                                    variant="brand"
                                    onClick={handleConfirm}
                                >
                                    Confirm Slot
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <Step2
                                selectedStaff={selectedStaff}
                                selectedDate={selectedDate}
                                selectedTime={selectedTime}
                                selectedService={selectedItem}
                                serviceImage={selectedImage}
                                serviceLabel={selectedLabel}
                                servicePrice={selectedPrice}
                                onNext={() => setStep(3)}
                            />
                            <DrawerFooter>
                                <Button
                                    className="w-full h-14 text-lg font-bold rounded-xl"
                                    variant="brand"
                                    onClick={() => setStep(3)}
                                >
                                    Next
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <Step3
                                selectedItem={selectedItem}
                                selectedStaff={selectedStaff}
                                selectedDate={selectedDate}
                                selectedTime={selectedTime}
                                totalAmount={selectedPrice}
                                onNext={() => setStep(4)}
                            />
                            <DrawerFooter>
                                <Button
                                    className="w-full h-14 text-lg font-bold rounded-xl"
                                    variant="brand"
                                    onClick={() => setStep(4)}
                                >
                                    Pay 20% Advance
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                    {step === 4 && (
                        <Step4
                            selectedItem={selectedItem}
                            selectedStaff={selectedStaff}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            serviceImage={selectedImage}
                            onClose={() => { setOpen(false); setStep(1); }}
                        />
                    )}
                </>
            </DrawerContent>
        </Drawer>
    );
}
