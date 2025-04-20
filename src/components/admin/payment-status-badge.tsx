interface PaymentStatusBadgeProps {
    status: string;
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
    let bgColor = "";
    let textColor = "";

    switch (status) {
        case "paid":
            bgColor = "bg-green-100";
            textColor = "text-green-800";
            break;
        case "unpaid":
            bgColor = "bg-yellow-100";
            textColor = "text-yellow-800";
            break;
        case "refunded":
            bgColor = "bg-blue-100";
            textColor = "text-blue-800";
            break;
        default:
            bgColor = "bg-gray-100";
            textColor = "text-gray-800";
    }

    return (
        <span
            className={`px-2 py-1 rounded-full text-xs ${bgColor} ${textColor} capitalize`}
        >
            {status}
        </span>
    );
}
