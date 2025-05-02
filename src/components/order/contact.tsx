import { Phone } from "lucide-react";
import { Input } from "../ui/input";

export const Contact: React.FC = () => (
    <section className="mb-8">
        <h3 className="mb-4 text-base font-medium">Contact</h3>
        <div className="space-y-4">
            <Input type="email" placeholder="Email" />
            <div className="flex items-center">
                <span className="mr-2">
                    <Phone />
                </span>
                <Input placeholder="0000000000" />
            </div>
        </div>
    </section>
);
