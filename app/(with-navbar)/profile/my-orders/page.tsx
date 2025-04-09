"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, CalendarDays, CreditCard } from "lucide-react";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `/api/orders/getuserorders`,
          {
            method: "POST",
            body: JSON.stringify({ email: session?.data?.user.email }),
          }
        );
        const data = await res.json();
        setOrders(data.orders);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.data?.user?.email) {
      fetchOrders();
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        My Orders
      </h1>

      <div className="space-y-8 max-w-4xl mx-auto">
        {loading ? (
          // Skeleton loader
          Array.from({ length: 2 }).map((_, index) => (
            <Card key={index} className="p-6">
              <CardContent className="space-y-4">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="flex gap-4 items-start border rounded-lg p-4 bg-white shadow-sm"
                    >
                      <Skeleton className="w-20 h-20 rounded-md" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-3 w-5/6" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          orders.map((order) => (
            <Card key={order._id} className="p-6">
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Order ID: {order.orderId}
                    </h2>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      {format(new Date(order.date), "PPPpp")}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Total Paid:{" "}
                      <span className="font-medium">
                        ${order.amount.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  {order.products.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex gap-4 items-start border rounded-lg p-4 bg-white shadow-sm"
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.productname}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {item.product.productname}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} | Price: $
                          {item.product.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.product.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
