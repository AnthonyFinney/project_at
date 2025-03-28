"use client";

import { Button } from "./ui/button";

export default function ProductAction() {
    return (
        <div className="space-y-3">
            <Button className="w-full py-6 taxt-base" size="lg">
                ADD TO CART
            </Button>
            <Button className="w-full py-6 taxt-base" size="lg">
                BUY NOW
            </Button>
        </div>
    );
}
