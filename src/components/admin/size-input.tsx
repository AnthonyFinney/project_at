"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SizeInputProps {
    label: string;
    initialStock?: number;
    initialAvailable?: boolean;
}

export function SizeInput({
    label,
    initialStock = 0,
    initialAvailable = false,
}: SizeInputProps) {
    const [stock, setStock] = useState(initialStock);
    const [available, setAvailable] = useState(initialAvailable);

    return (
        <div className="border rounded-md p-3 space-y-2">
            <div className="flex items-center justify-between">
                <Label className="font-medium">{label}</Label>
                <Switch checked={available} onCheckedChange={setAvailable} />
            </div>
            <Input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(Number.parseInt(e.target.value) || 0)}
                disabled={!available}
                placeholder="Stock"
            />
        </div>
    );
}
