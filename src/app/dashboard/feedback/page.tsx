"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/ui/star-rating";

// Mock data for the completed service
const completedService = {
  date: "Today",
  title: "Haircut",
  time: "10:00 AM - 11:00 AM",
  image: "/images/haircut.jpg",
};

export default function FeedbackPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    router.back();
  };

  const handleSubmit = () => {
    // Handle feedback submission
    console.log({
      rating,
      feedback,
      service: completedService.title,
    });
    setIsSubmitted(true);
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
        <div className="flex items-start justify-between mb-8">
          <div className="flex flex-col gap-1">
            <span className="text-brand text-sm font-medium">
              {completedService.date}
            </span>
            <h2 className="text-lg font-semibold text-gray-900">
              {completedService.title}
            </h2>
            <span className="text-sm text-brand">
              {completedService.time}
            </span>
          </div>
          <div className="relative w-20 h-16 rounded-lg overflow-hidden">
            <Image
              src={completedService.image}
              alt={completedService.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Rating Section */}
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Rate your experience
          </h3>
          {/* <StarRating
            rating={rating}
            onRatingChange={setRating}
            size="md"
          /> */}
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
            <p className="text-center text-gray-500 text-sm">
              Thank you for your feedback!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
