"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { UserForm } from "@/components/admin/user-form";
import { useParams } from "next/navigation";
import { mockUsers } from "@/lib/mock-data";

interface Address {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    district: string;
    isDefault: boolean;
}

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    provider: string;
    providerId: string;
    isVerified: boolean;
    role: string;
    addresses: Address[];
    createdAt: string;
    updatedAt: string;
}

export default function EditUserPage() {
    const params = useParams();
    const userId = params.id as string;
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, this would be an API call
        const fetchUser = async () => {
            try {
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                // Find the user in mock data
                const foundUser = mockUsers.find((u) => u.id === userId);

                if (foundUser) {
                    // Ensure the user data structure matches what the form expects
                    const formattedUser: User = {
                        id: foundUser.id,
                        name: foundUser.name || "",
                        email: foundUser.email || "",
                        phone: foundUser.phone || "",
                        provider: foundUser.provider || "credentials",
                        providerId: foundUser.providerId || "",
                        isVerified: foundUser.isVerified || false,
                        role: foundUser.role || "user",
                        addresses: (foundUser.addresses || []).map((a) => ({
                            street: a.street || "",
                            city: a.city || "",
                            postalCode: a.postalCode || "",
                            country: a.country || "",
                            district: "", // ✅ safe even if missing
                            isDefault: a.isDefault || false,
                        })),
                        createdAt: foundUser.createdAt,
                        updatedAt: foundUser.updatedAt,
                    };

                    setUser(formattedUser);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
                <p>
                    The user you're looking for doesn't exist or has been
                    removed.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Edit User"
                description="Update user information"
            />

            <UserForm initialData={user} />
        </div>
    );
}
