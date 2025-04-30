import { Contact } from "./contact";
import { Button } from "../ui/button";
import { BagSummary } from "./bag-summary";
import { DeliveryAddress } from "./delivery-address";
import { NewsletterOptIn } from "./newsletter-optIn";

export const GuestCheckoutForm: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
            <header className="mb-6">
                <h1 className="text-2xl font-bold">Guest Checkout</h1>
            </header>

            <BagSummary itemCount={1} />
            <DeliveryAddress />
            <Contact />
            <NewsletterOptIn />

            <div className="text-right">
                <Button>Next</Button>
            </div>
        </div>
    );
};
