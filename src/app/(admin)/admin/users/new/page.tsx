"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { UserForm } from "@/components/admin/user-form";

export default function NewUserPage() {
    // Initial empty user
    const emptyUser = {
        name: "",
        email: "",
        phone: "",
        provider: "credentials",
        providerId: "",
        isVerified: false,
        role: "user",
        addresses: [],
    };

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Add New User"
                description="Create a new user account"
            />

            <UserForm initialData={emptyUser} />
        </div>
    );
}
