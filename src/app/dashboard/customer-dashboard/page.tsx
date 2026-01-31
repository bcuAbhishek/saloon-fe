'use client'

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Container from "@/layout/container";
import DynamicServiceCard from "@/components/cards/dynamic-service-card";
import { useState } from "react";

interface Appointment {
  id: string;
  serviceName: string;
  serviceLabel: string;
  staffName: string;
  date: string;
  time: string;
  image: string;
  status: "upcoming" | "completed" | "cancelled";
  paymentStatus: string;
  bookingId: string;
}

export default function CustomerDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming");

  // Sample appointments data - this would come from API in real app
  const appointments: Appointment[] = [
    {
      id: "1",
      serviceName: "Classic Haircut",
      serviceLabel: "Hair Service",
      staffName: "Sarah",
      date: "Tue, Feb 4",
      time: "10:00 AM",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      status: "upcoming",
      paymentStatus: "20% Paid",
      bookingId: "1234567890",
    },
    {
      id: "2",
      serviceName: "Beard Trim",
      serviceLabel: "Beard Service",
      staffName: "John",
      date: "Wed, Feb 5",
      time: "2:00 PM",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
      status: "upcoming",
      paymentStatus: "20% Paid",
      bookingId: "1234567891",
    },
    {
      id: "3",
      serviceName: "Hair Coloring",
      serviceLabel: "Color Service",
      staffName: "Emma",
      date: "Mon, Jan 27",
      time: "11:00 AM",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      status: "completed",
      paymentStatus: "Paid",
      bookingId: "1234567888",
    },
    {
      id: "4",
      serviceName: "Classic Haircut",
      serviceLabel: "Hair Service",
      staffName: "Mike",
      date: "Sun, Jan 20",
      time: "3:00 PM",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      status: "cancelled",
      paymentStatus: "Refunded",
      bookingId: "1234567777",
    },
  ];

  const filteredAppointments = appointments.filter(apt => apt.status === activeTab);

  const tabs = [
    { key: "upcoming" as const, label: "Upcoming" },
    { key: "completed" as const, label: "Completed" },
    { key: "cancelled" as const, label: "Cancelled" },
  ];

  return (
    <Container className="py-4 flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="size-6" />
        </button>
        <h1 className="text-xl font-bold">My Appointments</h1>
        <div className="size-6" />
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 text-base font-medium transition-all relative ${
              activeTab === tab.key 
                ? "text-foreground" 
                : "text-primary-text"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-text rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="flex flex-col gap-4 mt-4">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-primary-text">No {activeTab} appointments</p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <DynamicServiceCard
              key={appointment.id}
              label={appointment.serviceLabel}
              title={appointment.serviceName}
              description={`With ${appointment.staffName} · ${appointment.date} · ${appointment.time}`}
              badgeText={appointment.paymentStatus}
              image={appointment.image}
              href={`/dashboard/booking-summary/${appointment.bookingId}`}
            />
          ))
        )}
      </div>
    </Container>
  );
}
