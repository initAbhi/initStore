"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, DollarSign, Package, Users } from "lucide-react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    productname: "",
    description: "",
    images: "",
    category: "",
    price: "",
    ratings: "",
  });
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `/api/admin/products`
      );
      const data = await res.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        if (data.success) setOrders(data.orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      images: formData.images.split(",").map((img) => img.trim()),
      price: parseFloat(formData.price),
      ratings: parseFloat(formData.ratings),
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (res.ok) {
      toast.success("Product added successfully!");
      setShowDialog(false);
      setFormData({
        productname: "",
        description: "",
        images: "",
        category: "",
        price: "",
        ratings: "",
      });
    } else {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <Tabs
        defaultValue="overview"
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <DollarSign className="text-green-500 w-6 h-6" />
                <div>
                  <p className="text-sm text-gray-500">Total Sales</p>
                  <p className="text-xl font-bold">$12,345</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <Package className="text-blue-500 w-6 h-6" />
                <div>
                  <p className="text-sm text-gray-500">Products</p>
                  <p className="text-xl font-bold">150</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <BarChart2 className="text-purple-500 w-6 h-6" />
                <div>
                  <p className="text-sm text-gray-500">Orders</p>
                  <p className="text-xl font-bold">320</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <Users className="text-orange-500 w-6 h-6" />
                <div>
                  <p className="text-sm text-gray-500">Customers</p>
                  <p className="text-xl font-bold">89</p>
                </div>
              </CardContent>
            </Card>
          </div>
         
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Recent Orders</h1>
            <div className="grid gap-6">
              {orders.map((order: any) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow p-4 space-y-3"
                >
                  <div className="text-gray-700">
                    <p>
                      <strong>Order ID:</strong> {order.orderId}
                    </p>
                    <p>
                      <strong>Email:</strong> {order.user.email}
                    </p>
                    <p>
                      <strong>Total:</strong> ₹{order.amount.toFixed(2)}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {order.products.map(
                      ({ product, quantity }: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 border p-2 rounded-md"
                        >
                          <Image
                            src={product.images[0]}
                            alt={product.productname}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                          <div className="text-sm">
                            <p className="font-medium">{product.productname}</p>
                            <p className="text-gray-500">Qty: {quantity}</p>
                            <p className="text-gray-500">₹{product.price}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="products">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Products</h2>
            <Button onClick={() => setShowDialog(true)}>Add New Product</Button>
          </div>
          <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <div key={product._id} className="border p-4 rounded-lg bg-white shadow-sm">
              <img
                src={product.images[0]}
                alt={product.productname}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h2 className="font-semibold">{product.productname}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="mt-1 text-sm">Price: ${product.price.toFixed(2)}</p>
              <p className="text-sm">Category: {product.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-7">
          <div className="bg-white p-4 rounded-xl shadow">
            Order management here
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Orders</h1>
            <div className="grid gap-6">
              {orders.map((order: any) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow p-4 space-y-3"
                >
                  <div className="text-gray-700">
                    <p>
                      <strong>Order ID:</strong> {order.orderId}
                    </p>
                    <p>
                      <strong>Email:</strong> {order.user.email}
                    </p>
                    <p>
                      <strong>Total:</strong> ₹{order.amount.toFixed(2)}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {order.products.map(
                      ({ product, quantity }: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 border p-2 rounded-md"
                        >
                          <Image
                            src={product.images[0]}
                            alt={product.productname}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                          <div className="text-sm">
                            <p className="font-medium">{product.productname}</p>
                            <p className="text-gray-500">Qty: {quantity}</p>
                            <p className="text-gray-500">₹{product.price}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="mt-7">
          <div className="bg-white p-4 rounded-xl shadow">
            Customer management here
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="productname"
              placeholder="Product Name"
              value={formData.productname}
              onChange={handleChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <Input
              name="images"
              placeholder="Image URLs (comma-separated)"
              value={formData.images}
              onChange={handleChange}
              required
            />
            <Input
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <Input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <Input
              name="ratings"
              type="number"
              step="0.1"
              placeholder="Ratings"
              value={formData.ratings}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
