"use client";

export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
            <div
                className="h-16 w-16 animate-spin rounded-full border-8 border-solid border-black border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
