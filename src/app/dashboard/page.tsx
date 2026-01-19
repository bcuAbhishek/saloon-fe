'use client'

import { useGetProfileQuery } from "@/modules/auth/queries";
import { useLogoutMutation } from "@/modules/auth/mutation";
import { Button } from "@/components/ui/button";
import Container from "@/layout/container";
import { BellRing } from "lucide-react";

export default function Page() {
    const { user , isLoading } = useGetProfileQuery();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    return (
        <Container className="py-4 md:py-8">
            <section className="flex justify-between">
                <h5 className="font-bold">HOME</h5>
                <BellRing />
            </section>
            
        </Container>    
    );
}
