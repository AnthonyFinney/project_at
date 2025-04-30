import { Checkbox } from "../ui/checkbox";

export const NewsletterOptIn: React.FC = () => (
    <div className="flex items-center mb-8">
        <Checkbox id="newsletter" />
        <label htmlFor="newsletter" className="ml-2 text-sm">
            Tick here if you want to hear more from Laced, including the latest
            news and releases.
        </label>
    </div>
);
