'use client'

import { ArrowLeft, Scissors, Percent } from "lucide-react";
import { useRouter } from "next/navigation";
import Container from "@/layout/container";
import { ActionCard } from "@/components/cards/action-card";
import { ListItemCard } from "@/components/cards/list-item-card";
import { Button } from "@/components/ui/button";

interface Reward {
  id: string;
  title: string;
  points: number;
  icon: "scissors" | "percent";
}

export default function RewardsPage() {
  const router = useRouter();

  // Sample data - would come from API
  const tierData = {
    name: "Silver Tier",
    visits: 12,
    amountSpent: 1200,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
  };

  const progressData = {
    current: 600,
    target: 1000,
    nextTier: "Gold",
  };

  const rewards: Reward[] = [
    {
      id: "1",
      title: "Free Haircut",
      points: 100,
      icon: "scissors",
    },
    {
      id: "2",
      title: "10% Off Next Service",
      points: 50,
      icon: "percent",
    },
  ];

  const progressPercentage = (progressData.current / progressData.target) * 100;

  const getRewardIcon = (iconType: string) => {
    switch (iconType) {
      case "scissors":
        return <Scissors className="size-5" />;
      case "percent":
        return <Percent className="size-5" />;
      default:
        return <Scissors className="size-5" />;
    }
  };

  const handleUseReward = (rewardId: string) => {
    // Handle reward redemption
    console.log("Using reward:", rewardId);
  };

  return (
    <Container className="py-4 flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="size-6" />
        </button>
        <h1 className="text-xl font-bold">Loyalty & Rewards</h1>
        <div className="size-6" />
      </div>

      {/* Tier Card */}
      <ActionCard
        image={tierData.image}
        title={tierData.name}
        metadata={[`${tierData.visits} visits · Rs ${tierData.amountSpent.toLocaleString()} spent`]}
        action={{
          label: "View Tier Benefits",
          onClick: () => console.log("View benefits"),
        }}
      />

      {/* Progress to Next Tier */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-foreground font-medium">Points to {progressData.nextTier}</p>
          <p className="text-foreground">{progressData.current}/{progressData.target}</p>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Available Rewards */}
      <section>
        <h3 className="text-xl font-bold text-foreground mb-4">Available Rewards</h3>
        <div className="space-y-2">
          {rewards.map((reward) => (
            <ListItemCard
              key={reward.id}
              icon={getRewardIcon(reward.icon)}
              title={reward.title}
              subtitle={`${reward.points} points`}
              rightElement={
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full px-4"
                  onClick={() => handleUseReward(reward.id)}
                >
                  Use Reward
                </Button>
              }
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
