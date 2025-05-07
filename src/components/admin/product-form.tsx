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
import { X, Plus, Trash } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { ProductType, VariantType } from "@/lib/schemas";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

// Define the component props using a Partial so that only some fields may be provided
export interface ProductFormProps {
    initialData?: Partial<ProductType>;
}

// Default values using the ProductFormValues interface.
const defaultValues: ProductType = {
    name: "",
    description: "",
    variants: [],
    category: {
        name: "",
        description: "",
        promotion: {
            type: [],
            details: "",
        },
    },
    isFeatured: false,
    tags: [],
    image: "",
    concentration: "",
    scentFamily: "",
    notes: {
        top: [],
        middle: [],
        base: [],
    },
};

export function ProductForm({ initialData }: ProductFormProps) {
    const { mutate } = useSWRConfig();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [newTopNote, setNewTopNote] = useState("");
    const [newMiddleNote, setNewMiddleNote] = useState("");
    const [newBaseNote, setNewBaseNote] = useState("");

    // Merge the defaults with any provided initial data.
    const [formData, setFormData] = useState<ProductType>({
        ...defaultValues,
        ...initialData,
    });
    const [newTag, setNewTag] = useState("");
    const [newPromotionType, setNewPromotionType] = useState("");

    // For the variant form, we use the VariantType as defined by your schemas.
    const [variantForm, setVariantForm] = useState<VariantType>({
        size: "",
        price: 0,
        stock: 0,
    });
    const [editingVariantIndex, setEditingVariantIndex] = useState<
        number | null
    >(null);

    const addNote = (tier: "top" | "middle" | "base", value: string) => {
        if (!value.trim()) return;

        setFormData((prev) => ({
            ...prev,
            notes: {
                ...prev.notes,
                [tier]: [...(prev.notes?.[tier] || []), value.trim()],
            },
        }));
    };

    const removeNote = (tier: "top" | "middle" | "base", note: string) => {
        setFormData((prev) => ({
            ...prev,
            notes: {
                ...prev.notes,
                [tier]: prev.notes?.[tier]?.filter((n) => n !== note) ?? [],
            },
        }));
    };

    // Handle simple changes for top-level inputs.
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle nested category changes.
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

    // Handle nested promotion changes.
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

    // Handle toggle change for isFeatured.
    const handleToggleChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, isFeatured: checked }));
    };

    // Handle tags array.
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

    // Handle variant form changes.
    const handleVariantChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVariantForm((prev) => ({
            ...prev,
            [name]: name === "size" ? value : Number(value),
        }));
    };

    // Core variant submission logic.
    const submitVariant = () => {
        if (!variantForm.size) {
            alert("Size is required");
            return;
        }

        if (editingVariantIndex !== null) {
            // Update an existing variant.
            const updatedVariants = [...formData.variants];
            updatedVariants[editingVariantIndex] = variantForm;
            setFormData((prev) => ({ ...prev, variants: updatedVariants }));
        } else {
            // Add a new variant.
            setFormData((prev) => ({
                ...prev,
                variants: [...prev.variants, variantForm],
            }));
        }
        // Reset variant form.
        setVariantForm({ size: "", price: 0, stock: 0 });
        setEditingVariantIndex(null);
    };

    const editVariant = (index: number) => {
        setVariantForm(formData.variants[index]);
        setEditingVariantIndex(index);
    };

    const removeVariant = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index),
        }));
    };

    // Handle promotion types array.
    const addPromotionType = () => {
        const promoType = newPromotionType.trim();
        if (
            promoType !== "" &&
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

    // Handle form submission.
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            // The formattedData already matches ProductType except createdAt/updatedAt,
            // which are set on the server. 'id' is omitted in the form state.
            const formattedData: ProductType = {
                ...formData,
            };

            const isEdit = Boolean(formData.id);
            const endPoint = isEdit
                ? `${window.location.origin}/api/products/${formData.id}`
                : `${window.location.origin}/api/products`;
            const method = isEdit ? "PATCH" : "POST";

            const res = await fetch(endPoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            });
            const result = await res.json();
            if (!res.ok) {
                console.error("API error:", result.error);
                return;
            }

            if (method === "PATCH") {
                toast("Item has been edited.");
            } else {
                toast("Item has been created.");
            }

            await mutate("/api/products", undefined, { revalidate: true });
            router.push("/admin/products");
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="space-y-6">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                    <TabsTrigger value="basic">Basic Information</TabsTrigger>
                    <TabsTrigger value="variants">Variants</TabsTrigger>
                    <TabsTrigger value="category">
                        Category & Promotion
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
                                <div className="sm:col-span-2 space-y-2">
                                    <Label htmlFor="concentration">
                                        Concentration
                                    </Label>
                                    <Input
                                        id="concentration"
                                        name="concentration"
                                        value={formData.concentration}
                                        onChange={handleChange}
                                        placeholder="e.g., Eau de Parfum"
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-2">
                                    <Label htmlFor="scentFamily">
                                        Scent Family
                                    </Label>
                                    <Input
                                        id="scentFamily"
                                        name="scentFamily"
                                        value={formData.scentFamily}
                                        onChange={handleChange}
                                        placeholder="e.g., Floral, Woody"
                                    />
                                </div>
                                {(["top", "middle", "base"] as const).map(
                                    (tier) => (
                                        <div
                                            key={tier}
                                            className="sm:col-span-2 space-y-2"
                                        >
                                            <Label>
                                                {tier.charAt(0).toUpperCase() +
                                                    tier.slice(1)}{" "}
                                                Notes
                                            </Label>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {formData.notes?.[tier]?.map(
                                                    (note, i) => (
                                                        <Badge
                                                            key={i}
                                                            className="gap-1 px-3 py-1"
                                                        >
                                                            {note}
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-4 w-4 p-0 hover:bg-transparent"
                                                                onClick={() =>
                                                                    removeNote(
                                                                        tier,
                                                                        note
                                                                    )
                                                                }
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </Button>
                                                        </Badge>
                                                    )
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder={`Add a ${tier} note`}
                                                    value={
                                                        tier === "top"
                                                            ? newTopNote
                                                            : tier === "middle"
                                                            ? newMiddleNote
                                                            : newBaseNote
                                                    }
                                                    onChange={(e) =>
                                                        tier === "top"
                                                            ? setNewTopNote(
                                                                  e.target.value
                                                              )
                                                            : tier === "middle"
                                                            ? setNewMiddleNote(
                                                                  e.target.value
                                                              )
                                                            : setNewBaseNote(
                                                                  e.target.value
                                                              )
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            addNote(
                                                                tier,
                                                                e.currentTarget
                                                                    .value
                                                            );
                                                            tier === "top"
                                                                ? setNewTopNote(
                                                                      ""
                                                                  )
                                                                : tier ===
                                                                  "middle"
                                                                ? setNewMiddleNote(
                                                                      ""
                                                                  )
                                                                : setNewBaseNote(
                                                                      ""
                                                                  );
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    onClick={() => {
                                                        const val =
                                                            tier === "top"
                                                                ? newTopNote
                                                                : tier ===
                                                                  "middle"
                                                                ? newMiddleNote
                                                                : newBaseNote;
                                                        addNote(tier, val);
                                                        tier === "top"
                                                            ? setNewTopNote("")
                                                            : tier === "middle"
                                                            ? setNewMiddleNote(
                                                                  ""
                                                              )
                                                            : setNewBaseNote(
                                                                  ""
                                                              );
                                                    }}
                                                >
                                                    <Plus className="h-4 w-4 mr-1" />
                                                    Add
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Variants Tab */}
                <TabsContent value="variants" className="space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">
                                        Product Variants
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Add different sizes, prices, and stock
                                        levels for this product.
                                    </p>

                                    {/* Variants Table */}
                                    {formData.variants.length > 0 && (
                                        <div className="rounded-md border overflow-x-auto mb-6">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>
                                                            Size
                                                        </TableHead>
                                                        <TableHead>
                                                            Price
                                                        </TableHead>
                                                        <TableHead>
                                                            Stock
                                                        </TableHead>
                                                        <TableHead className="text-right">
                                                            Actions
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {formData.variants.map(
                                                        (variant, index) => (
                                                            <TableRow
                                                                key={index}
                                                            >
                                                                <TableCell>
                                                                    {
                                                                        variant.size
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {formatPrice(
                                                                        variant.price
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        variant.stock
                                                                    }
                                                                </TableCell>
                                                                <TableCell className="text-right">
                                                                    <div className="flex justify-end gap-2">
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={() =>
                                                                                editVariant(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            Edit
                                                                        </Button>
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            className="text-red-500 hover:text-red-700"
                                                                            onClick={() =>
                                                                                removeVariant(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            <Trash className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}

                                    {/* Add/Edit Variant Form */}
                                    <div
                                        onKeyDown={(
                                            e: KeyboardEvent<HTMLDivElement>
                                        ) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                submitVariant();
                                            }
                                        }}
                                    >
                                        <div className="grid gap-4 sm:grid-cols-3">
                                            <div className="space-y-2">
                                                <Label htmlFor="variant-size">
                                                    Size
                                                </Label>
                                                <Input
                                                    id="variant-size"
                                                    name="size"
                                                    value={variantForm.size}
                                                    onChange={
                                                        handleVariantChange
                                                    }
                                                    placeholder="e.g., UK 8, XL, etc."
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="variant-price">
                                                    Price
                                                </Label>
                                                <Input
                                                    id="variant-price"
                                                    name="price"
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={variantForm.price}
                                                    onChange={
                                                        handleVariantChange
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="variant-stock">
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="variant-stock"
                                                    name="stock"
                                                    type="number"
                                                    min="0"
                                                    value={variantForm.stock}
                                                    onChange={
                                                        handleVariantChange
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end gap-2">
                                        {editingVariantIndex !== null && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    setVariantForm({
                                                        size: "",
                                                        price: 0,
                                                        stock: 0,
                                                    });
                                                    setEditingVariantIndex(
                                                        null
                                                    );
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                        <Button
                                            type="button"
                                            onClick={() => submitVariant()}
                                            className="bg-black hover:bg-black/90"
                                        >
                                            {editingVariantIndex !== null
                                                ? "Update Variant"
                                                : "Add Variant"}
                                        </Button>
                                    </div>
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
                                    <div className="border-2 border-dashed border-neutral-200 rounded-md p-8 text-center">
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
                    disabled={loading || formData.variants.length === 0}
                >
                    {loading
                        ? "Saving..."
                        : formData.id
                        ? "Update Product"
                        : "Create Product"}
                </Button>
            </div>
        </form>
    );
}
