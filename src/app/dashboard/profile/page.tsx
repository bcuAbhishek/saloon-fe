'use client'

import { ArrowLeft, Phone, User, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@/layout/container";
import { ListItemCard } from "@/components/cards/list-item-card";
import { Button } from "@/components/ui/button";
import { useGetProfileQuery } from "@/modules/auth/queries";
import { useLogoutMutation } from "@/modules/auth/mutation";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading } = useGetProfileQuery();
  const logoutMutation = useLogoutMutation();

  if (isLoading) {
    return (
      <Container className="py-4 flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </Container>
    );
  }

  // Calculate member since year (mock - would come from API)
  const memberSinceYear = 2022;

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Container className="py-4 flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="size-6" />
        </button>
        <h1 className="text-xl font-bold">Profile</h1>
        <div className="size-6" />
      </div>

      {/* Profile Image & Name */}
      <div className="flex flex-col items-center space-y-4 py-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-[#F8D0B0]">
          <Image
            src="/profile-placeholder.png"
            alt={user?.fullName || "Profile"}
            fill
            className="object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">{user?.fullName || "User"}</h2>
          <p className="text-primary-text">Member since {memberSinceYear}</p>
        </div>
      </div>

      {/* Account Section */}
      <section>
        <h3 className="text-lg font-bold text-foreground mb-4">Account</h3>
        <div className="space-y-2">
          <ListItemCard
            icon={<Phone className="size-5" />}
            title="Phone Number"
            subtitle={user?.phoneNumber || "+977 9841234567"}
          />
          <ListItemCard
            icon={<User className="size-5" />}
            title="Name"
            subtitle={user?.fullName || "User"}
          />
          <ListItemCard
            icon={<CalendarDays className="size-5" />}
            title="Date of Birth"
            subtitle="1990-05-15"
          />
        </div>
      </section>

      {/* Details Section */}
      <section>
        <h3 className="text-lg font-bold text-foreground mb-4">Details</h3>
        {/* Add more details here as needed */}
      </section>

      {/* Action Buttons */}
      <div className="space-y-3 mt-auto pt-6">
        <Button
          variant="brand"
          className="w-full h-14 text-lg font-bold rounded-xl"
        >
          Save Changes
        </Button>
        <Button
          variant="outline"
          className="w-full h-14 text-lg font-bold rounded-xl"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </Container>
  );
}
