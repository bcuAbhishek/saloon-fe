'use client'

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SearchBar } from "@/components/ui/searchbar";
import { NameChip } from "@/components/cards/name-chip";
import InfoCard from "@/components/cards/info-card";
import { ConfirmationOverlay1 } from "@/components/fields/confirmation-overlay";

interface ServiceItem {
    label: string;
    title: string;
    subtext: string;
    image: string;
    price: number;
}

export default function SaloonPage() {
    const pathname = usePathname();
    const [selectedItems, setSelectedItems] = useState<ServiceItem[]>([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const toggleServiceSelection = (item: ServiceItem) => {
        setSelectedItems(prev => {
            const isSelected = prev.some(i => i.title === item.title);
            if (isSelected) {
                return prev.filter(i => i.title !== item.title);
            } else {
                return [...prev, item];
            }
        });
    };

    const allServices: ServiceItem[] = [
        {
            label: "Hair Service",
            title: "Classic Haircut",
            subtext: "30 min · Rs. 500",
            image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
            price: 500,
        },
        {
            label: "Beard Service",
            title: "Beard Trim",
            subtext: "15 min · Rs. 300",
            image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
            price: 300,
        },
        {
            label: "Color Service",
            title: "Hair Coloring",
            subtext: "1 hr · Rs. 1200",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
            price: 1200,
        },
    ];

    // Map category to label for filtering
    const categoryToLabel: Record<string, string> = {
        Haircut: "Hair Service",
        Shave: "Beard Service",
        Color: "Color Service",
    };

    const filteredServices = allServices.filter(item => {
        const matchesSearch =
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.label.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory
            ? item.label === categoryToLabel[selectedCategory]
            : true;
        return matchesSearch && matchesCategory;
    });

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
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <section className="flex gap-2 flex-wrap">
                {["Haircut", "Shave", "Color"].map((service) => (
                    <div
                        key={service}
                        className={`cursor-pointer px-4 py-2 rounded-full border ${selectedCategory === service ? "bg-primary-text text-white border-primary-text" : "bg-muted text-foreground border-muted"}`}
                        onClick={() => setSelectedCategory(selectedCategory === service ? "" : service)}
                    >
                        {service}
                    </div>
                ))}
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {filteredServices.map((item, idx) => (
                    <InfoCard
                        key={item.title + idx}
                        label={item.label}
                        title={item.title}
                        subtext={item.subtext}
                        image={item.image}
                        selected={selectedItems.some(i => i.title === item.title)}
                        onClick={() => toggleServiceSelection(item)}
                    />
                ))}
            </div>
            <ConfirmationOverlay1 
                selectedItems={selectedItems}
            />
        </div>
        
    );
}