"use client";
import React from "react";
import Image from "next/image";
import { Star, CheckCircle, Facebook } from "lucide-react";
import { userAvatar } from "@/lib/utils";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

interface Testimonial {
    id: string;
    name: string;
    date: string;
    content: string;
    platform: "Google" | "Facebook";
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        id: "1",
        name: "Sarah Jenkins",
        date: "2 days ago",
        content: "Absolutely in love with The Woody Collection. The fragrance lasts all day and I constantly get compliments. Truly a treasure!",
        platform: "Google",
        rating: 5,
    },
    {
        id: "2",
        name: "Michael Chen",
        date: "1 week ago",
        content: "Very impressed with the packaging and the quality of the oud. It feels luxurious and the scent profile is incredibly complex and engaging.",
        platform: "Facebook",
        rating: 5,
    },
    {
        id: "3",
        name: "Emma Watson",
        date: "2 weeks ago",
        content: "The Citrus Burst is my new summer essential. It's perfectly balanced—not too sweet, and very refreshing. Fast shipping too!",
        platform: "Google",
        rating: 5,
    },
    {
        id: "4",
        name: "David Albas",
        date: "3 weeks ago",
        content: "I bought the Floral Bouquet as a gift for my wife and she adores it. Excellent customer service when I had questions about notes.",
        platform: "Facebook",
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="py-16 bg-neutral-50 dark:bg-black/5">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-xl md:text-2xl font-serif font-bold tracking-widest uppercase mb-4">
                        LET'S SEE WHAT CUSTOMERS TALK ABOUT US
                    </h2>
                    
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="flex space-x-1 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-current" />
                            ))}
                        </div>
                        <div className="text-sm font-medium">
                            <span className="font-bold">4.9/5</span>, 4390 reviews
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                >
                    {testimonials.map((review) => (
                        <motion.div key={review.id} variants={itemVariants} className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center space-x-3">
                                    <Image 
                                        src={userAvatar(review.id)} 
                                        alt={review.name} 
                                        width={40} 
                                        height={40} 
                                        className="rounded-full bg-neutral-100"
                                    />
                                    <div>
                                        <div className="flex items-center space-x-1">
                                            <span className="font-bold text-sm text-black">{review.name}</span>
                                            <CheckCircle className="w-3 h-3 text-blue-500" />
                                        </div>
                                        <span className="text-xs text-neutral-500">{review.date}</span>
                                    </div>
                                </div>
                                <div className="shrink-0">
                                    {review.platform === "Google" ? (
                                        <div className="w-5 h-5 flex items-center justify-center bg-white rounded-full">
                                            {/* Google "G" representation */}
                                            <span className="font-bold text-lg text-blue-600">G</span>
                                        </div>
                                    ) : (
                                        <Facebook className="w-5 h-5 text-blue-600 fill-current" />
                                    )}
                                </div>
                            </div>
                            
                            {/* Stars */}
                            <div className="flex text-yellow-500 mb-3">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-current" />
                                ))}
                            </div>
                            
                            {/* Content */}
                            <p className="text-sm text-neutral-700 flex-grow mb-4">
                                "{review.content}"
                            </p>
                            
                            <button className="text-xs font-semibold text-blue-600 self-start hover:underline">
                                Read more...
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
