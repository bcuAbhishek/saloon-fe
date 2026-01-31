'use client'

import { ArrowLeft, MessageSquare, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Container from "@/layout/container";
import DynamicServiceCard from "@/components/cards/dynamic-service-card";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
  hasFeedback?: boolean;
}

export default function CustomerDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming");
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState<Set<string>>(new Set());

  // Load submitted feedbacks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("submittedFeedbacks");
    if (stored) {
      setSubmittedFeedbacks(new Set(JSON.parse(stored)));
    }
  }, []);

  // Check if feedback was submitted for an appointment
  const hasFeedbackSubmitted = (appointmentId: string) => {
    return submittedFeedbacks.has(appointmentId);
  };

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
      hasFeedback: false,
    },
    {
      id: "4",
      serviceName: "Classic Haircut",
      serviceLabel: "Hair Service",
      staffName: "Mike",
      date: "Sun, Jan 20",
      time: "3:00 PM",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      status: "completed",
      paymentStatus: "Paid",
      bookingId: "1234567666",
      hasFeedback: true,
    },
    {
      id: "5",
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

  const handleGiveFeedback = (appointment: Appointment) => {
    // Navigate to feedback page with appointment data
    router.push(`/dashboard/feedback?id=${appointment.id}&service=${encodeURIComponent(appointment.serviceName)}&date=${encodeURIComponent(appointment.date)}&time=${encodeURIComponent(appointment.time)}&image=${encodeURIComponent(appointment.image)}`);
  };

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
            <div key={appointment.id} className="flex flex-col gap-2">
              <DynamicServiceCard
                label={appointment.serviceLabel}
                title={appointment.serviceName}
                description={`With ${appointment.staffName} · ${appointment.date} · ${appointment.time}`}
                badgeText={appointment.paymentStatus}
                image={appointment.image}
                href={`/dashboard/booking-summary/${appointment.bookingId}`}
              />
              {/* Feedback button for completed services */}
              {appointment.status === "completed" && (
                <div className="px-2">
                  {appointment.hasFeedback || hasFeedbackSubmitted(appointment.id) ? (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="size-4" />
                      <span>Feedback submitted</span>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => handleGiveFeedback(appointment)}
                    >
                      <MessageSquare className="size-4" />
                      Give Feedback
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </Container>
  );
}
