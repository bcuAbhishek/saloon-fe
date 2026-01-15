"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import type { MapMouseEvent } from "@vis.gl/react-google-maps";

interface GoogleMapProps {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
  onMapClick: (e: MapMouseEvent) => void;
  markerPosition: { lat: number; lng: number } | null;
  onMarkerDragEnd: (e: MapMouseEvent) => void;
}

export default function GoogleMap({
  apiKey,
  center,
  zoom,
  onMapClick,
  markerPosition,
  onMarkerDragEnd,
}: GoogleMapProps) {
  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={center}
        defaultZoom={zoom}
        onClick={onMapClick}
        gestureHandling="greedy"
        fullscreenControl={false}
        streetViewControl={false}
        mapTypeControl={false}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable
            onDragEnd={onMarkerDragEnd}
          />
        )}
      </Map>
    </APIProvider>
  );
}
