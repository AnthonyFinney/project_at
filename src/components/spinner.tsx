"use client";

import React from "react";

const Spinner = () => {
    return (
        <div className="flex items-center justify-center h-screen pb-24">
            <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
    );
};

export default Spinner;
