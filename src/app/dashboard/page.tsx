'use client'

import { useGetProfileQuery } from "@/modules/auth/queries";
import { useLogoutMutation } from "@/modules/auth/mutation";
import { Button } from "@/components/ui/button";
import Container from "@/layout/container";
import { BellRing } from "lucide-react";
import QuickActionCard from "@/components/cards/quick-action-cards";

export default function Page() {
    const { user , isLoading } = useGetProfileQuery();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    // Sample quick action data
    const quickActions = [
        {
            title: "Book Appointment",
            image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
            slug: "book-appointment",
        },
        {
            title: "Manage Staff",
            image: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=400&q=80",
            slug: "manage-staff",
        },
        {
            title: "View Reports",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
            slug: "reports",
        },
    ];

    return (
        <Container className="py-4 md:py-8">
            <section className="flex justify-between">
                <h5 className="font-bold">HOME</h5>
                <BellRing />
            </section>
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
        </Container>
    );
}
