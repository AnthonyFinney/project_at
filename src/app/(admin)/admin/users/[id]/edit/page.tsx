"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { UserForm } from "@/components/admin/user-form";
import { useParams } from "next/navigation";
import type { UserType } from "@/lib/schemas";
import useSWR from "swr";
import Spinner from "@/components/spinner";
import { fetcher } from "@/lib/utils";

export default function EditUserPage() {
    const params = useParams();
    const userId = params.id as string;

    const { data, error, isLoading } = useSWR<{
        success: boolean;
        data: UserType;
    }>(`/api/users/${userId}`, fetcher, {
        revalidateOnFocus: true,
    });

    const user = data?.success ? data.data : null;

    if (isLoading) {
        return <Spinner />;
    }

    if (error || !user) {
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
