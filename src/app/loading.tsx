"use client";

export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center h-screen justify-center pb-24 bg-white bg-opacity-50">
            <div
                className="h-16 w-16 p-2 animate-spin rounded-full border-8 border-solid border-black border-r-transparent"
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
