"use client"
import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import Image from "next/image";
import { Button } from "./ui/button";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { Star, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  productname: string; // Fixed typo from `prodcutname` to `productname`
  description: string;
  images: string[]; // Array of strings
  category: string;
  price: number;
  ratings: number;
  _v: number;
}

interface Props {
  product: Product;
}
export const ProductCard = ({ product }: Props) => {
  const router = useRouter();
  // const price = product.default_price as Stripe.Price;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link href={`/products/${product._id}`} className="block h-full">
        <Card className="group card-premium hover-lift h-full flex flex-col overflow-hidden border-0 shadow-premium">
          <div className="relative overflow-hidden">
        {product.images && product.images[0] && (
            <div className="relative h-64 w-full">
            <Image
              src={product.images[0]}
              alt={product.productname}
              fill
              className="object-cover group-hover:scale-110 transition-premium"
            />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-premium"></div>
              
              {/* Quick view button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-premium">
                <Button className="btn-premium text-sm px-6 py-2">
                  Quick View
                </Button>
              </div>
              
              {/* Rating badge */}
              <div className="absolute top-3 left-3 glass-morphism rounded-full px-3 py-1 flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-gray-700">{product.ratings}</span>
              </div>
          </div>
        )}
          </div>
          
          <div className="p-6 flex-grow flex flex-col">
            <div className="flex-grow">
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.productname}
              </h3>
          {product.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
          )}
            </div>
            
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-gradient">
                  ${product.price}
                </div>
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {product.category}
                </div>
              </div>
              
              <Button className="w-full btn-premium group/btn">
                <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                Add to Cart
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard