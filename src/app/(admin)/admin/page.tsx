import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AdminHeader } from "@/components/admin/admin-header";
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";
import { RecentOrdersTable } from "@/components/admin/recent-orders-table";
import { LowQuantityProducts } from "@/components/admin/low-quantity-products";

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <AdminHeader
                title="Dashboard"
                description="Overview of your store's performance"
            />

            {/* Stats Cards */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">£45,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Orders
                        </CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">
                            +12.4% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Products
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,324</div>
                        <p className="text-xs text-muted-foreground">
                            +42 new this month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Customers
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,234</div>
                        <p className="text-xs text-muted-foreground">
                            +10.1% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

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
