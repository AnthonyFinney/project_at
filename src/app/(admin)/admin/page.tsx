import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AdminHeader } from "@/components/admin/admin-header";
import { RecentOrdersTable } from "@/components/admin/recent-orders-table";
import { LowQuantityProducts } from "@/components/admin/low-quantity-products";

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <AdminHeader
                title="Dashboard"
                description="Overview of your store's performance"
            />

            {/* Recent Orders and Top Selling Products */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>
                            Latest orders from your store
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentOrdersTable />
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Low Quantity Products</CardTitle>
                        <CardDescription>
                            Stores products that have the lowest stock
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LowQuantityProducts />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
