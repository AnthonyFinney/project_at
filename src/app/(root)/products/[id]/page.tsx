import ProductDetailClient from "./ProductDetailClient";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div className="max-w-7x1 mx-auto px-4 py-8">
            <ProductDetailClient id={id} />
        </div>
    );
}
