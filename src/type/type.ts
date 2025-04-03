interface ProductType {
    id: string;
    name: string;
    brand: string;
    price: number;
    imageLink: string;
}

interface CartItemProps {
    item: ProductType;
    onRemove: () => void;
}

interface ProductCardProps {
    imageLink: string;
    brand: string;
    name: string;
    productLink: string;
    price: number;
}
