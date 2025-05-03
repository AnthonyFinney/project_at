"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { UserType, AddressType } from "@/lib/schemas";

export interface UserFormProps {
    initialData?: Partial<UserType>;
}

const defaultValues: UserType = {
    name: "",
    email: "",
    phone: "",
    provider: "credentials",
    providerId: "",
    isVerified: false,
    role: "user",
    passwordHash: "",
    addresses: [],
};

export function UserForm({ initialData }: UserFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<UserType>({
        ...defaultValues,
        ...initialData,
    });
    const [newAddress, setNewAddress] = useState<AddressType>({
        address: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
        district: "",
        isDefault: false,
    });
    const [editingAddressIndex, setEditingAddressIndex] = useState<
        number | null
    >(null);

    // Handle simple field changes
    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    // Handle boolean toggle
    const handleToggleChange = (field: string, checked: boolean) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: checked,
        }));
    };

    // Handle role change
    const handleRoleChange = (value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            role: value,
        }));
    };

    // Handle provider change
    const handleProviderChange = (value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            provider: value,
        }));
    };

    // Handle address form changes
    const handleAddressChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setNewAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle address default toggle
    const handleAddressDefaultToggle = (checked: boolean) => {
        setNewAddress((prev) => ({
            ...prev,
            isDefault: checked,
        }));
    };

    // Add or update address
    const handleAddressSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (
            !newAddress.address ||
            !newAddress.street ||
            !newAddress.city ||
            !newAddress.postalCode ||
            !newAddress.country
        ) {
            alert("Please fill in all required address fields");
            return;
        }

        if (editingAddressIndex !== null) {
            if (!formData.addresses) return;

            // Update existing address
            const updatedAddresses = [...formData.addresses];

            // If this address is being set as default, unset default on all others
            if (newAddress.isDefault) {
                updatedAddresses.forEach((addr) => (addr.isDefault = false));
            }

            updatedAddresses[editingAddressIndex] = newAddress;
            setFormData((prev: any) => ({
                ...prev,
                addresses: updatedAddresses,
            }));
        } else {
            if (!formData.addresses) return;

            // Add new address
            const updatedAddresses = [...formData.addresses];

            // If this address is being set as default, unset default on all others
            if (newAddress.isDefault) {
                updatedAddresses.forEach((addr) => (addr.isDefault = false));
            }

            updatedAddresses.push(newAddress);
            setFormData((prev: any) => ({
                ...prev,
                addresses: updatedAddresses,
            }));
        }

        // Reset form
        setNewAddress({
            address: "",
            street: "",
            city: "",
            postalCode: "",
            country: "",
            district: "",
            isDefault: false,
        });
        setEditingAddressIndex(null);
    };

    // Edit address
    const editAddress = (index: number) => {
        if (!formData.addresses) return;

        setNewAddress(formData.addresses[index]);
        setEditingAddressIndex(index);
    };

    // Remove address
    const removeAddress = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            addresses: prev.addresses?.filter((_, i) => i !== index),
        }));
    };

    // Set address as default
    const setAddressAsDefault = (index: number) => {
        const updatedAddresses = formData.addresses?.map(
            (addr: any, i: number) => ({
                ...addr,
                isDefault: i === index,
            })
        );

        setFormData((prev: any) => ({
            ...prev,
            addresses: updatedAddresses,
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formattedData: UserType = {
                ...formData,
            };

            const isEdit = Boolean(formData.id);
            const endPoint = isEdit
                ? `${window.location.origin}/api/users/${formData.id}`
                : `${window.location.origin}/api/users`;
            const method = isEdit ? "PATCH" : "POST";

            const res = await fetch(endPoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            });
            const result = await res.json();
            if (!res.ok) {
                console.error("API ERROR:", result.error);
                return;
            }

            router.push("/admin/users");
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="space-y-6">
                <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="basic">Basic Information</TabsTrigger>
                    <TabsTrigger value="addresses">Addresses</TabsTrigger>
                </TabsList>

                {/* Basic Information Tab */}
                <TabsContent value="basic" className="space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                {formData.id ? (
                                    <></>
                                ) : (
                                    <div className="space-y-2">
                                        <Label htmlFor="passwordHash">
                                            Password
                                        </Label>
                                        <Input
                                            id="passwordHash"
                                            name="passwordHash"
                                            value={formData.passwordHash}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="role">User Role</Label>
                                    <Select
                                        value={formData.role}
                                        onValueChange={handleRoleChange}
                                    >
                                        <SelectTrigger id="role">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="user">
                                                User
                                            </SelectItem>
                                            <SelectItem value="admin">
                                                Admin
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="provider">
                                        Authentication Provider
                                    </Label>
                                    <Select
                                        value={formData.provider}
                                        onValueChange={handleProviderChange}
                                    >
                                        <SelectTrigger id="provider">
                                            <SelectValue placeholder="Select provider" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="credentials">
                                                Credentials
                                            </SelectItem>
                                            <SelectItem value="google">
                                                Google
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {formData.provider === "google" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="providerId">
                                            Provider ID
                                        </Label>
                                        <Input
                                            id="providerId"
                                            name="providerId"
                                            value={formData.providerId}
                                            onChange={handleChange}
                                            disabled={
                                                formData.provider !== "google"
                                            }
                                        />
                                    </div>
                                )}

                                <div className="space-y-2 sm:col-span-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="isVerified">
                                            Email Verified
                                        </Label>
                                        <Switch
                                            id="isVerified"
                                            checked={formData.isVerified}
                                            onCheckedChange={(checked) =>
                                                handleToggleChange(
                                                    "isVerified",
                                                    checked
                                                )
                                            }
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Indicates whether the user's email
                                        address has been verified.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Addresses Tab */}
                <TabsContent value="addresses" className="space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-6">
                                {/* Existing Addresses */}
                                {formData.addresses?.length! > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">
                                            Saved Addresses
                                        </h3>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {formData.addresses?.map(
                                                (address: any, index: any) => (
                                                    <div
                                                        key={index}
                                                        className="border rounded-md p-4 relative"
                                                    >
                                                        {address.isDefault && (
                                                            <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                                                                Default
                                                            </Badge>
                                                        )}
                                                        <p className="font-medium">
                                                            {address.street}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {address.city},{" "}
                                                            {address.postalCode}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {address.country}
                                                        </p>
                                                        {address.district && (
                                                            <p className="text-sm text-muted-foreground">
                                                                {
                                                                    address.district
                                                                }
                                                            </p>
                                                        )}

                                                        <div className="mt-4 flex gap-2">
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() =>
                                                                    editAddress(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                Edit
                                                            </Button>
                                                            {!address.isDefault && (
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        setAddressAsDefault(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    Set as
                                                                    Default
                                                                </Button>
                                                            )}
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-red-500 hover:text-red-700"
                                                                onClick={() =>
                                                                    removeAddress(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <Trash className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Add/Edit Address Form */}
                                <div className="border rounded-md p-4 bg-neutral-50">
                                    <h4 className="font-medium mb-4">
                                        {editingAddressIndex !== null
                                            ? "Edit Address"
                                            : "Add New Address"}
                                    </h4>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2 sm:col-span-2">
                                            <Label htmlFor="adress">
                                                Address
                                            </Label>
                                            <Input
                                                id="address"
                                                name="address"
                                                value={newAddress.address}
                                                onChange={handleAddressChange}
                                                placeholder="123 Main St, Apt 4B"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2 sm:col-span-2">
                                            <Label htmlFor="street">
                                                Street Address
                                            </Label>
                                            <Input
                                                id="street"
                                                name="street"
                                                value={newAddress.street}
                                                onChange={handleAddressChange}
                                                placeholder="123 Main St, Apt 4B"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input
                                                id="city"
                                                name="city"
                                                value={newAddress.city}
                                                onChange={handleAddressChange}
                                                placeholder="London"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="postalCode">
                                                Postal Code
                                            </Label>
                                            <Input
                                                id="postalCode"
                                                name="postalCode"
                                                value={newAddress.postalCode}
                                                onChange={handleAddressChange}
                                                placeholder="E1 6AN"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="country">
                                                Country
                                            </Label>
                                            <Input
                                                id="country"
                                                name="country"
                                                value={newAddress.country}
                                                onChange={handleAddressChange}
                                                placeholder="United Kingdom"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="district">
                                                District (Optional)
                                            </Label>
                                            <Input
                                                id="district"
                                                name="district"
                                                value={newAddress.district}
                                                onChange={handleAddressChange}
                                                placeholder="East London"
                                            />
                                        </div>
                                        <div className="space-y-2 sm:col-span-2">
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="isDefault"
                                                    checked={
                                                        newAddress.isDefault
                                                    }
                                                    onCheckedChange={
                                                        handleAddressDefaultToggle
                                                    }
                                                />
                                                <Label htmlFor="isDefault">
                                                    Set as default address
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end gap-2">
                                        {editingAddressIndex !== null && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    setNewAddress({
                                                        address: "",
                                                        street: "",
                                                        city: "",
                                                        postalCode: "",
                                                        country: "",
                                                        district: "",
                                                        isDefault: false,
                                                    });
                                                    setEditingAddressIndex(
                                                        null
                                                    );
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                        <Button
                                            type="button"
                                            onClick={handleAddressSubmit}
                                            className="bg-black hover:bg-black/90"
                                        >
                                            {editingAddressIndex !== null
                                                ? "Update Address"
                                                : "Add Address"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/users")}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="bg-black hover:bg-black/90"
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : formData.id
                        ? "Update User"
                        : "Create User"}
                </Button>
            </div>
        </form>
    );
}
