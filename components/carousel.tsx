"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

// interface Props {
//   products: Stripe.Product[];
// }

export const Carousel = ({ products }: { products: Product[] }) => {
  const [current, setCurrent] = useState<number>(1);
  // console.log(products)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        (prev + 1) % products.length == 0 ? 1 : (prev + 1) % products.length
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];

  const price = currentProduct.price;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden h-96 rounded-3xl shadow-premium"
    >
      <Card className="relative overflow-hidden h-full border-0 rounded-3xl">
      {currentProduct.images && currentProduct.images[0] && (
        <div className="relative h-full w-full">
          <Image
            src={currentProduct.images[0]}
            alt={currentProduct.productname}
            fill
            className="object-cover transition-all duration-1000 ease-in-out scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>
      )}
      
      <CardContent className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-2xl px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Limited Time Offer
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Premium Protection
            <span className="block text-gradient-gold">Up to 50% Off</span>
          </h2>
          
          <p className="text-white/90 text-lg sm:text-xl mb-8 leading-relaxed">
            Discover our exclusive collection of premium smartphone cases with unbeatable deals
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild className="btn-premium text-lg px-8 py-4 group">
              <Link href="/products" className="flex items-center gap-2">
                Shop Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </CardContent>
      </Card>
    </motion.div>
  );
};
