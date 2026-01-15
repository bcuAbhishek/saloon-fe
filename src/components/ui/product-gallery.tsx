import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageData {
  id: string;
  url: string;
  alt: string;
}

interface ProductGalleryProps {
  images: ImageData[];
  autoRotateInterval?: number; // in milliseconds
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  autoRotateInterval = 5000,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Auto-rotate functionality
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [images.length, autoRotateInterval]);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Image */}
      <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden aspect-video relative">
        <Image
          src={images[selectedIndex].url}
          alt={images[selectedIndex].alt}
          fill
          className="object-cover"
          priority={selectedIndex === 0}
        />

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => handleThumbnailClick(index)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
              index === selectedIndex
                ? "border-primary ring-2 ring-primary/20"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 150px"
            />
          </button>
        ))}
      </div>

      {/* Auto-rotate indicator */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="flex gap-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "w-8 bg-primary" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
