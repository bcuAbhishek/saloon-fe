"use client";

import Container from "@/layout/container";
import { useGetProfileQuery } from "@/modules/auth/queries";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { SearchBar } from "../ui/searchbar";

export default function HomePageSection() {
  const router = useRouter();
  const { user } = useGetProfileQuery();

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
      <div>
        <section
          className="min-h-[50vh] bg-cover bg-center"
          style={{
            backgroundImage:"url('/saloon.jpg')",
          }}
        />
      <Container className="text-center py-4 md:py-8 lg:py-12 flex flex-col justify-between items-center min-h-[50vh]">
        <section className="flex flex-col space-y-4" ><h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Welcome to Smart Salon Management System
        </h1>
        <p className="text-base md:text-lg lg:text-xl">
          Book, manage, and grow your salon — smarter.
        </p>
       
      </section>
        
        <Button
          className="w-full h-14 text-lg font-bold rounded-xl"
          variant="brand"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </Container> 
    </div>
  );
}
