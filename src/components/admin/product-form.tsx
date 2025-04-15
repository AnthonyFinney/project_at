"use client";

import { useState, ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { ProductType } from "@/lib/schemas";

// Define a type for the form state optimized for input.
interface ProductFormValues {
    name: string;
    description: string;
    price: string; // input returns string
    size: string[];
    stock: string; // input returns string
    isFeatured: boolean;
    tags: string[];
    image: string;
    category: {
        name: string;
        description: string;
        promotion: {
            type: string[];
            details: string;
        };
    };
}

interface ProductFormProps {
    initialData?: Partial<ProductFormValues>;
}

export function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const defaultValues: ProductFormValues = {
        name: "",
        description: "",
        price: "",
        size: [],
        stock: "",
        isFeatured: false,
        tags: [],
        image: "",
        category: {
            name: "",
            description: "",
            promotion: {
                type: [],
                details: "",
            },
        },
        ...initialData,
    };

    const [formData, setFormData] = useState<ProductFormValues>(defaultValues);
    const [newTag, setNewTag] = useState("");
    const [newSize, setNewSize] = useState("");
    const [newPromotionType, setNewPromotionType] = useState("");

    // Handle simple field changes
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle nested category field changes
    const handleCategoryChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            category: {
                ...prev.category,
                [name]: value,
            },
        }));
    };

    // Handle nested promotion field changes
    const handlePromotionChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            category: {
                ...prev.category,
                promotion: {
                    ...prev.category.promotion,
                    [name]: value,
                },
            },
        }));
    };

    // Handle boolean toggle
    const handleToggleChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, isFeatured: checked }));
    };

    // Handle tags array
    const addTag = () => {
        const tag = newTag.trim();
        if (tag && !formData.tags.includes(tag)) {
            setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
            setNewTag("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    // Handle sizes array
    const addSize = () => {
        const size = newSize.trim();
        if (size && !formData.size.includes(size)) {
            setFormData((prev) => ({ ...prev, size: [...prev.size, size] }));
            setNewSize("");
        }
    };

    const removeSize = (sizeToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            size: prev.size.filter((size) => size !== sizeToRemove),
        }));
    };

    // Handle promotion types array
    const addPromotionType = () => {
        const promoType = newPromotionType.trim();
        if (
            promoType &&
            !formData.category.promotion.type.includes(promoType)
        ) {
            setFormData((prev) => ({
                ...prev,
                category: {
                    ...prev.category,
                    promotion: {
                        ...prev.category.promotion,
                        type: [...prev.category.promotion.type, promoType],
                    },
                },
            }));
            setNewPromotionType("");
        }
    };

    const removePromotionType = (typeToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            category: {
                ...prev.category,
                promotion: {
                    ...prev.category.promotion,
                    type: prev.category.promotion.type.filter(
                        (type) => type !== typeToRemove
                    ),
                },
            },
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Transform formData to match ProductType (where price and stock are numbers)
            const formattedData: ProductType = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                size: formData.size,
                stock: parseInt(formData.stock, 10),
                isFeatured: formData.isFeatured,
                tags: formData.tags,
                image: formData.image,
                category: {
                    name: formData.category.name,
                    description: formData.category.description,
                    promotion: {
                        type: formData.category.promotion.type,
                        details: formData.category.promotion.details,
                    },
                },
                createdAt: "", // Set on the server
                updatedAt: "", // Set on the server
                // id is optional and will be set by the DB
            };

            const res = await fetch(`${window.location.origin}/api/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            });

            // Get the response from the API
            const result = await res.json();

            if (!res.ok) {
                // Optionally handle error from the API
                console.error("API error:", result.error);
                // You could display an error message here if needed
                return;
            }

            router.push("/admin/products");
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="space-y-6">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                    <TabsTrigger value="basic">Basic Information</TabsTrigger>
                    <TabsTrigger value="category">
                        Category & Promotion
                    </TabsTrigger>
                    <TabsTrigger value="inventory">
                        Inventory & Features
                    </TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                </TabsList>

                {/* Basic Information Tab */}
                <TabsContent value="basic" className="space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price (£)</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        rows={5}
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-2">
                                    <Label>Tags</Label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {formData.tags.map((tag, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="gap-1 px-3 py-1"
                                            >
                                                {tag}
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-4 w-4 p-0 hover:bg-transparent"
                                                    onClick={() =>
                                                        removeTag(tag)
                                                    }
                                                >
                                                    <X className="h-3 w-3" />
                                                    <span className="sr-only">
                                                        Remove {tag}
                                                    </span>
                                                </Button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Add a tag"
                                            value={newTag}
                                            onChange={(e) =>
                                                setNewTag(e.target.value)
                                            }
                                            onKeyDown={(
                                                e: KeyboardEvent<HTMLInputElement>
                                            ) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    addTag();
                                                }
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            onClick={addTag}
                                            size="sm"
                                        >
                                            <Plus className="h-4 w-4 mr-1" />{" "}
                                            Add
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Press Enter or click Add to add a tag.
                                        Tags help with product search and
                                        categorization.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Category & Promotion Tab */}
                <TabsContent value="category" className="space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="category-name">
                                        Category Name
                                    </Label>
                                    <Input
                                        id="category-name"
                                        name="name"
                                        value={formData.category.name}
                                        onChange={handleCategoryChange}
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-2">
                                    <Label htmlFor="category-description">
                                        Category Description
                                    </Label>
                                    <Textarea
                                        id="category-description"
                                        name="description"
                                        rows={3}
                                        value={formData.category.description}
                                        onChange={handleCategoryChange}
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-4 border p-4 rounded-md bg-neutral-50">
                                    <h3 className="font-medium">
                                        Promotion Information
                                    </h3>
                                    <div className="space-y-2">
                                        <Label>Promotion Types</Label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {formData.category.promotion.type.map(
                                                (type, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="gap-1 px-3 py-1"
                                                    >
                                                        {type}
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-4 w-4 p-0 hover:bg-transparent"
                                                            onClick={() =>
                                                                removePromotionType(
                                                                    type
                                                                )
                                                            }
                                                        >
                                                            <X className="h-3 w-3" />
                                                            <span className="sr-only">
                                                                Remove {type}
                                                            </span>
                                                        </Button>
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Add promotion type"
                                                value={newPromotionType}
                                                onChange={(e) =>
                                                    setNewPromotionType(
                                                        e.target.value
                                                    )
                                                }
                                                onKeyDown={(
                                                    e: KeyboardEvent<HTMLInputElement>
                                                ) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        addPromotionType();
                                                    }
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                onClick={addPromotionType}
                                                size="sm"
                                            >
                                                <Plus className="h-4 w-4 mr-1" />{" "}
                                                Add
                                            </Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Examples: New Arrival, Sale, Limited
                                            Edition, Exclusive
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="promotion-details">
                                            Promotion Details
                                        </Label>
                                        <Textarea
                                            id="promotion-details"
                                            name="details"
                                            rows={3}
                                            value={
                                                formData.category.promotion
                                                    .details
                                            }
                                            onChange={handlePromotionChange}
                                            placeholder="Enter promotion details, e.g., '20% off until end of month'"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Inventory & Features Tab */}
                <TabsContent value="inventory" className="space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="stock">
                                        Stock Quantity
                                    </Label>
                                    <Input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        min="0"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="featured">
                                            Featured Product
                                        </Label>
                                        <Switch
                                            id="featured"
                                            checked={formData.isFeatured}
                                            onCheckedChange={handleToggleChange}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Featured products appear on the homepage
                                        and in promotional areas.
                                    </p>
                                </div>
                                <div className="sm:col-span-2 space-y-2">
                                    <Label>Available Sizes</Label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {formData.size.map((size, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="gap-1 px-3 py-1"
                                            >
                                                {size}
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-4 w-4 p-0 hover:bg-transparent"
                                                    onClick={() =>
                                                        removeSize(size)
                                                    }
                                                >
                                                    <X className="h-3 w-3" />
                                                    <span className="sr-only">
                                                        Remove {size}
                                                    </span>
                                                </Button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Add a size (e.g., UK 8, M, XL)"
                                            value={newSize}
                                            onChange={(e) =>
                                                setNewSize(e.target.value)
                                            }
                                            onKeyDown={(
                                                e: KeyboardEvent<HTMLInputElement>
                                            ) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    addSize();
                                                }
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            onClick={addSize}
                                            size="sm"
                                        >
                                            <Plus className="h-4 w-4 mr-1" />{" "}
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Media Tab */}
                <TabsContent value="media" className="space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="image">Image URL</Label>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="url"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="https://example.com/image.jpg"
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Enter a valid URL for the product image.
                                        For multiple images, use the uploader
                                        below.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Additional Images</Label>
                                    <div className="border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center">
                                        <div className="mx-auto flex flex-col items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-10 w-10 text-neutral-400 mb-3"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <p className="text-sm text-neutral-500 mb-2">
                                                Drag and drop your images here,
                                                or click to browse
                                            </p>
                                            <p className="text-xs text-neutral-400">
                                                Supports JPG, PNG, WEBP up to
                                                5MB
                                            </p>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="mt-4"
                                            >
                                                Upload Images
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                {formData.image && (
                                    <div className="space-y-2">
                                        <Label>Image Preview</Label>
                                        <div className="border rounded-md p-2 w-full">
                                            <div className="relative aspect-square w-full max-w-[200px] mx-auto">
                                                <img
                                                    src={
                                                        formData.image ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt="Product preview"
                                                    className="object-contain w-full h-full"
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            "/placeholder.svg?height=200&width=200";
                                                        e.currentTarget.alt =
                                                            "Invalid image URL";
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/products")}
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
                        : initialData
                        ? "Update Product"
                        : "Create Product"}
                </Button>
            </div>
        </form>
    );
}
