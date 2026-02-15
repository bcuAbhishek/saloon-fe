'use client';

import InfoCard from "@/components/cards/info-card";
import { ConfirmationOverlay1 } from "@/components/fields/confirmation-overlay";
import { SearchBar } from "@/components/ui/searchbar";
import { useGetSaloonQuery } from "@/modules/saloons/queries";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface ServiceItem {
    id: string;
    label: string;
    title: string;
    subtext: string;
    image: string;
    price: number;
    durationInMinutes: number;
}

export default function SaloonPage() {
    const params = useParams();
    const router = useRouter();
    const saloonId = params.slug as string;

    const [selectedItems, setSelectedItems] = useState<ServiceItem[]>([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const { data: saloonEnvelope, isLoading: isSaloonLoading } = useGetSaloonQuery(saloonId);

    const saloon = saloonEnvelope?.data;
    const services = saloon?.services ?? [];

    const toggleServiceSelection = (item: ServiceItem) => {
        setSelectedItems(prev => {
            const isSelected = prev.some(i => i.id === item.id);
            if (isSelected) {
                return prev.filter(i => i.id !== item.id);
            } else {
                return [...prev, item];
            }
        });
    };

    const categories = useMemo(() => {
        if (!services) return ["All"];
        const uniqueCategories = new Set(services.map(s => s.category?.name || "Other"));
        return ["All", ...Array.from(uniqueCategories)];
    }, [services]);

    const filteredServices = useMemo(() => {
        return services.filter(service => {
            const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = selectedCategory === "All" || (service.category?.name || "Other") === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [services, search, selectedCategory]);

    const mappedServices: ServiceItem[] = filteredServices.map(service => ({
        id: service.id,
        label: service.category?.name || "Service",
        title: service.name,
        subtext: `${service.durationInMinutes} min · Rs. ${service.price}`,
        image: service.imageUrl || "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
        price: service.price,
        durationInMinutes: service.durationInMinutes,
    }));


    if (isSaloonLoading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    if (!saloon) {
        return <div className="p-8 text-center">Saloon not found.</div>;
    }

    return (
        <div className="px-2 py-4 flex flex-col space-y-4 mx-4">
            <div className="flex items-center justify-between mb-6">
                <button onClick={() => router.back()} className="p-1 hover:bg-gray-100 rounded-full">
                     <ArrowLeft className="size-7" />
                </button>
               
                <div className="text-center">
                     <h2 className="text-xl font-bold text-foreground">
                        {saloon.name}
                    </h2>
                     <p className="text-sm text-gray-500">{saloon.address}</p>
                </div>
                <div className="size-7" />
            </div>
            
            <div className="flex justify-end mb-6">
                <SearchBar
                    placeholder="Search for service"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <section className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                    <div
                        key={category}
                        className={`cursor-pointer px-4 py-2 rounded-full border transition-colors ${
                            selectedCategory === category 
                                ? "bg-primary-text text-primary-foreground border-primary-text" 
                                : "bg-muted text-foreground border-muted hover:bg-gray-200"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </div>
                ))}
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {mappedServices.map((item) => (
                    <InfoCard
                        key={item.id}
                        label={item.label}
                        title={item.title}
                        subtext={item.subtext}
                        image={item.image}
                        selected={selectedItems.some(i => i.id === item.id)}
                        onClick={() => toggleServiceSelection(item)}
                    />
                ))}
                 {mappedServices.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        No services found.
                    </div>
                )}
            </div>
            
            <ConfirmationOverlay1
                saloonId={saloonId}
                saloon={saloon}
                selectedItems={selectedItems}
            />
        </div>
    );
}