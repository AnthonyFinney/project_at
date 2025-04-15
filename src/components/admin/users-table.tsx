"use client";

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash, Shield, User, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockUsers } from "@/lib/mock-data";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

interface UsersTableProps {
    searchQuery: string;
}

interface Address {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
    district?: string; // 👈 Make optional
}

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    provider: string;
    providerId?: string;
    isVerified: boolean;
    role: string;
    addresses: Address[];
    createdAt: string;
    updatedAt: string;
}

export function UsersTable({ searchQuery }: UsersTableProps) {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

    useEffect(() => {
        // Filter users based on search query
        const filteredUsers = mockUsers.filter(
            (user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (user.phone &&
                    user.phone
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()))
        );
        setUsers(filteredUsers);
    }, [searchQuery]);

    const handleEdit = (userId: string) => {
        router.push(`/admin/users/${userId}`);
    };

    const handleDelete = (userId: string) => {
        setDeleteUserId(userId);
    };

    const confirmDelete = () => {
        if (!deleteUserId) return;

        // In a real app, this would be an API call
        setUsers(users.filter((user) => user.id !== deleteUserId));
        setDeleteUserId(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <>
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Role
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Status
                            </TableHead>
                            <TableHead className="hidden lg:table-cell">
                                Joined
                            </TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="text-center py-8 text-muted-foreground"
                                >
                                    No users found
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                {user.role === "admin" ? (
                                                    <Shield className="h-5 w-5 text-neutral-500" />
                                                ) : (
                                                    <User className="h-5 w-5 text-neutral-500" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Mail className="h-3 w-3" />
                                                    {user.email}
                                                </div>
                                                <div className="text-xs md:hidden mt-1">
                                                    <Badge
                                                        variant={
                                                            user.role ===
                                                            "admin"
                                                                ? "default"
                                                                : "outline"
                                                        }
                                                        className="text-[10px] px-1 py-0"
                                                    >
                                                        {user.role}
                                                    </Badge>
                                                </div>
                                                <div className="text-xs sm:hidden mt-1">
                                                    <Badge
                                                        variant={
                                                            user.isVerified
                                                                ? "outline"
                                                                : "destructive"
                                                        }
                                                        className="text-[10px] px-1 py-0 bg-transparent border"
                                                    >
                                                        {user.isVerified
                                                            ? "Verified"
                                                            : "Unverified"}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Badge
                                            variant={
                                                user.role === "admin"
                                                    ? "default"
                                                    : "outline"
                                            }
                                        >
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge
                                            variant={
                                                user.isVerified
                                                    ? "outline"
                                                    : "destructive"
                                            }
                                            className={
                                                user.isVerified
                                                    ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                                                    : ""
                                            }
                                        >
                                            {user.isVerified
                                                ? "Verified"
                                                : "Unverified"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell text-muted-foreground">
                                        {formatDate(user.createdAt)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleEdit(user.id)
                                                    }
                                                >
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                    className="text-red-600"
                                                >
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog
                open={!!deleteUserId}
                onOpenChange={() => setDeleteUserId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the user account and all associated data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
