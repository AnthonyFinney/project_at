"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ZoomIn, Tag, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CartItemType, ProductType, VariantType } from "@/lib/schemas";
import ProductAction from "./product-actions";

// Animation Variants
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const infoVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface ProductGalleryProps {
    product: ProductType;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState<VariantType>(
        product.variants[0]
    );
    const [cartItem, setCartItem] = useState<CartItemType>({
        productId: product.id as string,
        name: product.name,
        image: product.image,
        size: product.variants[0].size,
        price: product.variants[0].price,
        quantity: 1,
    });

    useEffect(() => {
        if (!product.id) return;
        setCartItem({
            productId: product.id,
            name: product.name,
            image: product.image,
            size: selectedVariant.size,
            price: selectedVariant.price,
            quantity: 1,
        });
    }, [product, selectedVariant]);

    const toggleZoom = () => setIsZoomed((prev) => !prev);

    return (
        <motion.div
            className="w-full grid gap-8 md:grid-cols-2 my-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
        >
            {/* Animated Image Section */}
            <motion.div
                className="relative w-full overflow-hidden rounded-lg border bg-background"
                variants={imageVariants}
                whileHover={{ scale: 1.02 }}
            >
                <motion.div
                    className={cn(
                        "relative w-full transition-transform duration-300 ease-in-out aspect-[4/3]",
                        isZoomed
                            ? "scale-150 cursor-zoom-out"
                            : "cursor-zoom-in"
                    )}
                    onClick={toggleZoom}
                    layout
                >
                    <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain"
                        priority
                    />

                    {!isZoomed && (
                        <button
                            className="absolute bottom-4 right-4 rounded-full bg-background/80 p-2 backdrop-blur-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleZoom();
                            }}
                            aria-label="Zoom image"
                        >
                            <ZoomIn className="h-5 w-5" />
                        </button>
                    )}
                </motion.div>
            </motion.div>

            {/* Animated Info Section */}
            <motion.div className="flex flex-col gap-4" variants={infoVariants}>
                {/* Product Title & Tags */}
                <div>
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        {product.isFeatured && (
                            <Badge variant="secondary" className="ml-2">
                                Featured
                            </Badge>
                        )}
                    </div>
                    {product.concentration && (
                        <p className="text-sm font-medium text-muted-foreground mt-1">
                            {product.concentration}
                        </p>
                    )}
                    {product.scentFamily && (
                        <p className="text-sm text-muted-foreground">
                            Scent Family: {product.scentFamily}
                        </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {product.tags.map((tag, i) => (
                            <Badge
                                key={i}
                                variant="outline"
                                className="flex items-center gap-1"
                            >
                                <Tag className="h-3 w-3" /> {tag}
                            </Badge>
                        ))}
                    </div>
                    <p className="text-2xl font-semibold mt-2 text-primary">
                        {formatPrice(selectedVariant.price)}
                    </p>
                </div>

                <Separator />

                {/* Variant Selector & Stock */}
                <div>
                    <h2 className="font-medium mb-2">Select Size</h2>
                    <RadioGroup
                        defaultValue={selectedVariant.size}
                        className="flex flex-wrap gap-2"
                        onValueChange={(value) => {
                            const variant = product.variants.find(
                                (v) => v.size === value
                            );
                            if (variant) setSelectedVariant(variant);
                        }}
                    >
                        {product.variants.map((variant) => (
                            <div
                                key={variant.size}
                                className="flex items-center space-x-2"
                            >
                                <RadioGroupItem
                                    value={variant.size}
                                    id={`size-${variant.size}`}
                                    className="peer sr-only"
                                />
                                <Label
                                    htmlFor={`size-${variant.size}`}
                                    className="flex h-10 min-w-16 cursor-pointer items-center justify-center rounded-md border border-muted bg-popover px-3 text-center font-medium peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                                >
                                    {variant.size}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                    {selectedVariant.stock !== undefined && (
                        <p className="text-sm text-muted-foreground mt-2">
                            {selectedVariant.stock > 0 ? (
                                <span className="flex items-center">
                                    <Check className="h-4 w-4 mr-1 text-green-500" />
                                    In Stock ({selectedVariant.stock} available)
                                </span>
                            ) : (
                                "Out of Stock"
                            )}
                        </p>
                    )}
                </div>

                {/* Tabs with AnimatePresence for smooth transitions */}
                <Tabs defaultValue="description" className="w-full mt-2">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="description">
                            Description
                        </TabsTrigger>
                        <TabsTrigger value="notes">Notes</TabsTrigger>
                        <TabsTrigger value="category">Category</TabsTrigger>
                        <TabsTrigger value="promotion">Promotion</TabsTrigger>
                    </TabsList>
                    {["description", "notes", "category", "promotion"].map(
                        (key) => (
                            <TabsContent value={key} className="mt-2" key={key}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        variants={tabVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                    >
                                        {key === "description" && (
                                            <p className="text-sm text-muted-foreground">
                                                {product.description}
                                            </p>
                                        )}

                                        {key === "notes" && product.notes && (
                                            <div className="space-y-3">
                                                {product.notes.top &&
                                                    product.notes.top.length >
                                                        0 && (
                                                        <div>
                                                            <h3 className="text-sm font-medium">
                                                                Top Notes
                                                            </h3>
                                                            <p className="text-sm text-muted-foreground">
                                                                {product.notes.top.join(
                                                                    ", "
                                                                )}
                                                            </p>
                                                        </div>
                                                    )}
                                                {product.notes.middle &&
                                                    product.notes.middle
                                                        .length > 0 && (
                                                        <div>
                                                            <h3 className="text-sm font-medium">
                                                                Middle Notes
                                                            </h3>
                                                            <p className="text-sm text-muted-foreground">
                                                                {product.notes.middle.join(
                                                                    ", "
                                                                )}
                                                            </p>
                                                        </div>
                                                    )}
                                                {product.notes.base &&
                                                    product.notes.base.length >
                                                        0 && (
                                                        <div>
                                                            <h3 className="text-sm font-medium">
                                                                Base Notes
                                                            </h3>
                                                            <p className="text-sm text-muted-foreground">
                                                                {product.notes.base.join(
                                                                    ", "
                                                                )}
                                                            </p>
                                                        </div>
                                                    )}
                                            </div>
                                        )}

                                        {key === "category" && (
                                            <div className="space-y-2">
                                                <h3 className="font-medium">
                                                    {product.category.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {
                                                        product.category
                                                            .description
                                                    }
                                                </p>
                                            </div>
                                        )}

                                        {key === "promotion" &&
                                            product.category.promotion && (
                                                <div className="space-y-2">
                                                    <div className="flex flex-wrap gap-2">
                                                        {product.category.promotion.type.map(
                                                            (promo) => (
                                                                <Badge
                                                                    key={promo}
                                                                    variant="secondary"
                                                                >
                                                                    {promo}
                                                                </Badge>
                                                            )
                                                        )}
                                                    </div>
                                                    {product.category.promotion
                                                        .details && (
                                                        <p className="text-sm text-gray-700 mt-1">
                                                            {
                                                                product.category
                                                                    .promotion
                                                                    .details
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                    </motion.div>
                                </AnimatePresence>
                            </TabsContent>
                        )
                    )}
                </Tabs>

                {/* Action Button */}
                <ProductAction cartItem={cartItem} />

                {product.createdAt && (
                    <p className="text-xs text-muted-foreground mt-4">
                        Added on{" "}
                        {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                )}
            </motion.div>
        </motion.div>
    );
}
