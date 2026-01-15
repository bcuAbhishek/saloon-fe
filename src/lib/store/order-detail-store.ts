import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrderLocation {
  address: string;
  lat: number;
  lng: number;
  postcode: string;
}

interface OrderDetailStore {
  location: OrderLocation | null;
  setLocation: (location: OrderLocation) => void;
  clearLocation: () => void;
}

export const useOrderDetailStore = create<OrderDetailStore>()(
  persist(
    (set) => ({
      location: null,
      setLocation: (location) => set({ location }),
      clearLocation: () => set({ location: null }),
    }),
    {
      name: "order-detail-storage", // unique name for localStorage key
    }
  )
);
