"use client";

import { Button } from "@/components/ui/button";
import { env } from "@/config/env";
import type { MapMouseEvent } from "@vis.gl/react-google-maps";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

// Dynamically import map component to avoid SSR issues and Map constructor conflicts
const GoogleMap = dynamic(() => import("./google-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
});

interface AddressResult {
  address: string;
  lat: number;
  lng: number;
  postcode: string;
}

interface MapOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (result: AddressResult) => void;
  initialLat?: number;
  initialLng?: number;
  initialAddress?: string;
}

// Cache for geocoding results to avoid multiple API calls
const geocodeCache = new Map<string, AddressResult>();

export default function MapOverlay({
  isOpen,
  onClose,
  onConfirm,
  initialLat,
  initialLng,
  initialAddress,
}: MapOverlayProps) {
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [address, setAddress] = useState<string>(initialAddress || "");
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [postcode, setPostcode] = useState<string>("");

  // Geocode function with caching
  const geocodePosition = useCallback(async (lat: number, lng: number) => {
    const cacheKey = `${lat.toFixed(6)},${lng.toFixed(6)}`;

    // Check cache first
    if (geocodeCache.has(cacheKey)) {
      const cached = geocodeCache.get(cacheKey)!;
      setAddress(cached.address);
      setPostcode(cached.postcode);
      return cached;
    }

    setIsLoadingAddress(true);

    try {
      if (typeof window !== "undefined" && (window as any).google?.maps) {
        const geocoder = new (window as any).google.maps.Geocoder();

        return new Promise<AddressResult>((resolve, reject) => {
          geocoder.geocode(
            { location: { lat, lng } },
            (results: any, status: string) => {
              setIsLoadingAddress(false);

              if (status === "OK" && results && results[0]) {
                const formattedAddress = results[0].formatted_address;

                // Extract postal code
                const getComponent = (type: string) =>
                  results[0].address_components.find((c: any) =>
                    c.types.includes(type)
                  )?.long_name || "";

                const postalCode = getComponent("postal_code");

                const result: AddressResult = {
                  address: formattedAddress,
                  lat,
                  lng,
                  postcode: postalCode,
                };

                // Cache the result
                geocodeCache.set(cacheKey, result);

                setAddress(formattedAddress);
                setPostcode(postalCode);
                resolve(result);
              } else {
                const errorMsg = "Could not find address for this location";
                setAddress(errorMsg);
                setPostcode("");
                reject(new Error(errorMsg));
              }
            }
          );
        });
      } else {
        // Fallback if Google Maps not loaded
        const fallbackAddress = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        const result: AddressResult = {
          address: fallbackAddress,
          lat,
          lng,
          postcode: "",
        };
        setAddress(fallbackAddress);
        setPostcode("");
        setIsLoadingAddress(false);
        return result;
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setIsLoadingAddress(false);
      setAddress("Error getting address");
      setPostcode("");
      throw error;
    }
  }, []);

  // Initialize marker position and geocode if needed
  useEffect(() => {
    if (isOpen) {
      if (initialLat && initialLng) {
        setMarkerPosition({ lat: initialLat, lng: initialLng });
        if (initialAddress && !initialAddress.includes(initialLat.toString())) {
          // We have a proper address, use it
          setAddress(initialAddress);
          // Still geocode to get postcode if not in cache
          geocodePosition(initialLat, initialLng).catch(() => {
            // Silently fail if geocoding fails, we already have address
          });
        } else {
          // Geocode to get address and postcode
          geocodePosition(initialLat, initialLng);
        }
      } else {
        // Default to Malaysia center if no initial position
        setMarkerPosition({ lat: 4.2105, lng: 101.9758 });
        setAddress("");
        setPostcode("");
      }
    }
  }, [isOpen, initialLat, initialLng, initialAddress, geocodePosition]);

  // Handle marker drag end
  const handleMarkerDragEnd = useCallback(
    (e: MapMouseEvent) => {
      const latLng = (e as any).detail?.latLng || (e as any).latLng;
      if (latLng) {
        const lat =
          typeof latLng.lat === "function" ? latLng.lat() : latLng.lat;
        const lng =
          typeof latLng.lng === "function" ? latLng.lng() : latLng.lng;
        setMarkerPosition({ lat, lng });
        geocodePosition(lat, lng);
      }
    },
    [geocodePosition]
  );

  // Handle map click
  const handleMapClick = useCallback(
    (e: MapMouseEvent) => {
      const latLng = (e as any).detail?.latLng || (e as any).latLng;
      if (latLng) {
        const lat =
          typeof latLng.lat === "function" ? latLng.lat() : latLng.lat;
        const lng =
          typeof latLng.lng === "function" ? latLng.lng() : latLng.lng;
        setMarkerPosition({ lat, lng });
        geocodePosition(lat, lng);
      }
    },
    [geocodePosition]
  );

  // Handle confirm
  const handleConfirm = useCallback(() => {
    if (markerPosition) {
      const result: AddressResult = {
        address,
        lat: markerPosition.lat,
        lng: markerPosition.lng,
        postcode,
      };
      onConfirm(result);
      onClose();
    }
  }, [markerPosition, address, postcode, onConfirm, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative h-screen w-screen bg-white">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-white p-4 shadow-md">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              Select Delivery Location
            </h3>
            {address && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                {address}
              </p>
            )}
            {isLoadingAddress && (
              <p className="text-sm text-gray-500 mt-1">Loading address...</p>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="ml-4"
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Map */}
        <div className="h-full w-full pt-20 pb-24">
          <GoogleMap
            apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            center={markerPosition || { lat: 4.2105, lng: 101.9758 }}
            zoom={15}
            onMapClick={handleMapClick}
            markerPosition={markerPosition}
            onMarkerDragEnd={handleMarkerDragEnd}
          />
        </div>

        {/* Footer with buttons */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white p-4 shadow-lg border-t">
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleConfirm}
              disabled={!markerPosition || isLoadingAddress}
              className="flex-1"
            >
              Confirm Location
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
