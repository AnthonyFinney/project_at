"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        title: "TRENDING Styles",
        subtitle: "OUR MOST POPULAR SILHOUETTES",
        description:
            "The most versatile silhouettes of the moment, discover best-selling Air Jordan, ASICS and adidas in shades to suit every season.",
        image: "/placeholder.svg?height=500&width=1200",
    },
    {
        id: 2,
        title: "TRENDING Styles",
        subtitle: "OUR MOST POPULAR SILHOUETTES",
        description:
            "The most versatile silhouettes of the moment, discover best-selling Air Jordan, ASICS and adidas in shades to suit every season.",
        image: "/placeholder.svg?height=500&width=1200",
    },
];

export function TrendingStylesSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="relative w-full h-[550px] bg-neutral-200">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${slides[currentSlide].image})`,
                }}
            >
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
                <div className="max-w-md text-white">
                    <h1 className="text-5xl font-light mb-2">
                        {slides[currentSlide].title}
                    </h1>
                    <h2 className="text-2xl font-medium mb-4">
                        {slides[currentSlide].subtitle}
                    </h2>
                    <p className="mb-6 text-sm">
                        {slides[currentSlide].description}
                    </p>
                    <Button
                        variant="default"
                        className="bg-black hover:bg-black/80 rounded-none px-8"
                    >
                        SHOP NOW
                    </Button>
                </div>
            </div>

            <div className="absolute bottom-6 left-6 flex items-center gap-4 text-white">
                <span className="text-sm">{`${currentSlide + 1}/${
                    slides.length
                }`}</span>
                <div className="flex gap-2">
                    <button
                        onClick={prevSlide}
                        className="p-1 border border-white/50 rounded-full"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-1 border border-white/50 rounded-full"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
