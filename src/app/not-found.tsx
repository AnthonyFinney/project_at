"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Hourglass } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white px-4 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-center">
                <div className="w-[600px] h-[600px] bg-yellow-600 rounded-full blur-[150px]"></div>
            </div>

            <motion.div 
                className="z-10 flex flex-col items-center text-center space-y-8 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="relative">
                    <motion.h1 
                        className="text-7xl md:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-yellow-700 tracking-wider"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    >
                        404
                    </motion.h1>
                    <motion.div 
                        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-full flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                    </motion.div>
                </div>

                <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <div className="flex items-center justify-center space-x-3 text-yellow-500">
                        <Hourglass className="h-6 w-6 animate-pulse" />
                        <h2 className="text-2xl md:text-3xl font-serif tracking-[0.2em] uppercase">
                            Coming Soon
                        </h2>
                    </div>
                    
                    <p className="text-neutral-400 max-w-md mx-auto text-sm md:text-base leading-relaxed tracking-wide">
                        We are currently crafting something extraordinary for this page. 
                        The essence of Kholzi's Treasure will soon be revealed here.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="pt-8"
                >
                    <Link 
                        href="/" 
                        className="group flex items-center space-x-2 border border-yellow-600 px-8 py-3 rounded-sm hover:bg-yellow-600 hover:text-black transition-all duration-300 uppercase tracking-widest text-xs font-bold text-yellow-600"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span>Return to Collection</span>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
