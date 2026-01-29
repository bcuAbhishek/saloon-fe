'use client'

import { useGetProfileQuery } from "@/modules/auth/queries";
import { useLogoutMutation } from "@/modules/auth/mutation";
import { Button } from "@/components/ui/button";
import Container from "@/layout/container";
import { BellRing } from "lucide-react";
import QuickActionCard from "@/components/cards/quick-action-cards";
import DynamicServiceCard from "@/components/cards/dynamic-service-card";
import { SearchBar } from "@/components/ui/searchbar";

export default function Page() {
    const { user , isLoading } = useGetProfileQuery();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    // Sample quick action data
    const quickActions = [
        {
            title: "Saloon Name",
            image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
            slug: `/saloon/sample-saloon`,
        },
        {
            title: "Saloon",
            image: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=400&q=80",
            slug: "manage-staff",
        },
        {
            title: "Saloon",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
            slug: "reports",
        },
        {
            title: "Saloon",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
            slug: "reports",
        },
        {
            title: "Saloon",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
            slug: "reports",
        },
        {
            title: "Saloon",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
            slug: "reports",
        },
        {
            title: "Saloon",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
            slug: "reports",
        },
    ];


    return (
        <Container className="py-4 md:py-8 flex flex-col space-y-4">
            <section className="flex justify-between">
                <h5 className="font-bold">HOME</h5>
                <BellRing />
            </section>
            <div className="my-4">
                <h1 className="mt-4 text-3xl font-bold">Hi, {user?.fullName} 👋</h1>
            </div>
            <DynamicServiceCard
                label="Upcoming Appointment"
                title="Haircut & Style"
                description="Tue, Jul 23 · 10:00 AM"
                badgeText="20% Paid"
                image="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
                href="/booking-summary"
            />
            <div className="flex justify-between gap-8 my-6 items-center">
                <h2 className="">Saloon</h2>
                <SearchBar
                    placeholder="Search for saloon/service"                   
                />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {quickActions.map((action) => (
                    <QuickActionCard
                        key={action.slug}
                        title={action.title}
                        image={action.image}
                        slug={action.slug}
                    />
                ))}
            </div>
            <div></div>
        </Container>
    );
}
