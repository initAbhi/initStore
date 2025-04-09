"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-6">
     <header className="flex justify-between items-center py-4">
  <motion.h1
    className="text-3xl font-bold text-gray-800"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    ShopSphere
  </motion.h1>
  
  <div className="flex items-center space-x-4">
    <nav className="space-x-2">
      <Button variant="ghost">Home</Button>
      <Button variant="ghost">Shop</Button>
      <Button variant="ghost">About</Button>
      <Button variant="ghost">Contact</Button>
    </nav>
    
    {/* User Profile Button */}
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300"
    >
      <img
        src="https://i.pravatar.cc/40"
        alt="User Avatar"
        className="w-full h-full object-cover"
      />
    </motion.button>
  </div>
</header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Discover the Future of Shopping
          </h2>
          <p className="text-gray-600 text-lg">
            Explore top products with exclusive deals and unmatched convenience.
          </p>
          <div className="flex space-x-4">
            <Button className="px-6 py-3 text-lg">Shop Now</Button>
            <Button variant="outline" className="px-6 py-3 text-lg">
              Learn More
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-sm">
            <img
              src="https://source.unsplash.com/featured/?ecommerce,products"
              alt="Hero Product"
              className="rounded-2xl shadow-lg"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute top-2 right-2 bg-white shadow-md rounded-full p-2"
            >
              <ShoppingBag className="w-6 h-6 text-gray-800" />
            </motion.div>
          </div>
        </motion.div>
      </main>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Fast Shipping", "Top Rated", "24/7 Support"].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-800">{feature}</h3>
            </div>
            <p className="mt-2 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, itaque.
            </p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
