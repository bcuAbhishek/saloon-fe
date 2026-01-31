"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/ui/star-rating";
import DynamicServiceCard from "@/components/cards/dynamic-service-card";

export default function FeedbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get service data from URL params
  const appointmentId = searchParams.get("id") || "";
  const serviceName = searchParams.get("service") || "Service";
  const serviceDate = searchParams.get("date") || "Today";
  const serviceTime = searchParams.get("time") || "";
  const serviceImage = searchParams.get("image") || "/images/default.jpg";

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    router.back();
  };

  const handleSubmit = () => {
    // Store feedback data (would be an API call in production)
    const feedbackData = {
      appointmentId,
      rating,
      feedback,
      service: serviceName,
      submittedAt: new Date().toISOString(),
    };
    console.log("Feedback submitted:", feedbackData);
    
    // Save to localStorage to track submitted feedbacks
    const stored = localStorage.getItem("submittedFeedbacks");
    const submittedFeedbacks: string[] = stored ? JSON.parse(stored) : [];
    if (!submittedFeedbacks.includes(appointmentId)) {
      submittedFeedbacks.push(appointmentId);
      localStorage.setItem("submittedFeedbacks", JSON.stringify(submittedFeedbacks));
    }
    
    // Show thank you message
    setIsSubmitted(true);
    
    // Reset form after a short delay
    setTimeout(() => {
      setRating(0);
      setFeedback("");
      setIsSubmitted(false);
      // Navigate back after reset
      router.back();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={handleClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">Feedback</h1>
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Service Info */}
        <div className="mb-6">
          <DynamicServiceCard
            label={serviceDate}
            title={serviceName}
            description={serviceTime}
            image={serviceImage}
          />
        </div>

        {/* Rating Section */}
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Rate your experience
          </h3>
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            size="md"
          />
        </div>

        {/* Feedback Textarea */}
        <div className="mb-6">
          <Textarea
            placeholder="Share your experience..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[120px] resize-none border-gray-200 focus:border-brand focus:ring-brand"
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Submit Button */}
        <div className="space-y-4">
          <Button
            variant="brand"
            className="w-full h-12 text-base font-medium"
            onClick={handleSubmit}
            disabled={rating === 0}
          >
            Submit Feedback
          </Button>

          {/* Thank you message */}
          {isSubmitted && (
            <p className="text-center text-primary-text text-sm">
              Thank you for your feedback!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
