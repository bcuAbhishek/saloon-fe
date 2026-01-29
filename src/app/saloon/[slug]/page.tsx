'use client'

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SearchBar } from "@/components/ui/searchbar";
import { NameChip } from "@/components/cards/name-chip";
import InfoCard from "@/components/cards/info-card";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

export default function SaloonPage() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname()
    const [selectedItem, setSelectedItem] = useState('')

    const saloonPath = pathname.split('/').pop();
    return (
        <div className="px-2 py-4 flex flex-col space-y-4 mx-4">
            
            <div className="flex items-center justify-between mb-6">
                <ArrowLeft className="size-7" />
                <h2 className="text-xl font-bold text-foreground">Choose a Service Catalog</h2>
                <div className="size-7" />
            </div>
            <div className="flex justify-end mb-6">
                <SearchBar
                    placeholder="Search for saloon/service"
                   
                />
            </div>
            <section className="flex gap-2 flex-wrap">
                {['Haircut', 'Shave', 'Color'].map((service) => (
                    <NameChip key={service} label={service} />
                ))}
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {[
                    {
                        label: "Hair Service",
                        title: "Classic Haircut",
                        subtext: "30 min · $25",
                        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
                    },
                    {
                        label: "Beard Service",
                        title: "Beard Trim",
                        subtext: "15 min · $15",
                        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
                    },
                    {
                        label: "Color Service",
                        title: "Hair Coloring",
                        subtext: "1 hr · $60",
                        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
                    },
                ].map((item, idx) => (
                    <InfoCard
                        key={item.title + idx}
                        label={item.label}
                        title={item.title}
                        subtext={item.subtext}
                        image={item.image}
                        selected={selectedItem === item.title}
                        onClick={() => {
                            setSelectedItem(item.title);
                        }}
                    />
                ))}
            </div>
            
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button
                        className="w-full h-14 text-lg font-bold rounded-xl"
                        variant="brand"
                    >
                        Continue
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="h-[80vh]">
                    <DrawerHeader>
                        <DrawerTitle>Service Details</DrawerTitle>
                        <DrawerDescription>
                            Select your preferred service
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex-1 px-4 py-6">
                        {selectedItem && (
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">{selectedItem}</h3>
                                <p className="text-primary-text">Selected service: {selectedItem}</p>
                            </div>
                        )}
                    </div>
                    <div>
                        {}
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}