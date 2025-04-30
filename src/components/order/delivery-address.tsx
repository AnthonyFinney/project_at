import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const DeliveryAddress: React.FC = () => (
    <section className="mb-8">
        <h3 className="mb-4 text-base font-medium">Delivery Address</h3>
        <div className="grid grid-cols-2 gap-4">
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
        </div>

        <div className="mt-4">
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose country" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="bd">Bangladesh</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="mt-4 space-y-4">
            <Input placeholder="Start typing your address" />
            <Input placeholder="Address Line One" />
            <Input placeholder="Address Line Two" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
            <Input placeholder="City" />
            <Input placeholder="Postcode" />
        </div>
    </section>
);
