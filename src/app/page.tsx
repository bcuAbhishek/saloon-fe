'use client'

import HomePageSection from "@/components/sections/home-page";
import { useGetProfileQuery } from "@/modules/auth/queries";
import { Home } from "lucide-react";

export default function Page() {

  const {user, isLoading, isError}  = useGetProfileQuery()

  console.log(`USER PROFILE : ${JSON.stringify(user)}, isLoading: ${isLoading}, isError: ${isError}`)
  return (
    <div>
       <HomePageSection />
    </div>
  );
}