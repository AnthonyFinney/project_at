"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProductGallery({
    images = [
        "https://placehold.co/600x600/png",
        "https://placehold.co/600x600/png",
        "https://placehold.co/600x600/png",
        "https://placehold.co/600x600/png",
        "https://placehold.co/600x600/png",
    ],
    className = "",
    mainImageSize = "aspect-square",
    thumbnailSize = "small",
    maxWidth = "",
}) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const handlePrevious = () => {
        setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const toggleZoom = () => {
        setIsZoomed((prev) => !prev);
    };

    const thumbnailSizeClass =
        {
            small: "h-16 w-16",
            medium: "h-20 w-20",
            large: "h-24 w-24",
        }[thumbnailSize] || "h-20 w-20";

    return (
        <div
            className={cn(
                "w-full flex flex-col gap-4",
                maxWidth && `max-w-[${maxWidth}]`,
                className
            )}
        >
            <div className="relative w-full overflow-hidden rounded-lg border bg-background">
                <div
                    className={cn(
                        "relative w-full transition-all duration-300 ease-in-out",
                        mainImageSize,
                        isZoomed
                            ? "scale-150 cursor-zoom-out"
                            : "cursor-zoom-in"
                    )}
                    onClick={toggleZoom}
                >
                    <Image
                        src={
                            images[selectedImage] ||
                            "https://placehold.co/600x600/png"
                        }
                        alt={`Product Image ${selectedImage + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain"
                        priority
                    />

                    {!isZoomed && (
                        <button
                            className="absolute bottom-4 right-4 rounded-full bg-background/80 p-2 backdrop-blur-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleZoom();
                            }}
                            aria-label="Zoom image"
                        >
                            <ZoomIn className="h-5 w-5" />
                        </button>
                    )}
                </div>

                <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full opacity-80 shadow-sm pointer-events-auto"
                        onClick={handlePrevious}
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full opacity-80 shadow-sm pointer-events-auto"
                        onClick={handleNext}
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="hidden md:flex gap-2 overflow-x-auto">
                {images.slice(0, 5).map((image, index) => (
                    <button
                        key={index}
                        className={cn(
                            "relative flex-shrink-0 overflow-hidden rounded-md border transition-colors",
                            thumbnailSizeClass,
                            selectedImage === index
                                ? "border-primary ring-2 ring-primary ring-offset-2"
                                : "hover:border-gray-400"
                        )}
                        onClick={() => setSelectedImage(index)}
                        aria-label={`View image ${index + 1}`}
                        aria-current={selectedImage === index}
                    >
                        <Image
                            src={image || "https://placehold.co/80x80/png"}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 20vw, 10vw"
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>

            <div className="flex md:hidden justify-center gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "h-2 w-2 rounded-full transition-colors",
                            selectedImage === index
                                ? "bg-primary"
                                : "bg-gray-300"
                        )}
                        onClick={() => setSelectedImage(index)}
                        aria-label={`View image ${index + 1}`}
                        aria-current={selectedImage === index}
                    />
                ))}
            </div>
        </div>
    );
}
