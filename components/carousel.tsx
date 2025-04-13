"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

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
    <Card className="relative overflow-hidden h-140 rounded-lg shadow-md border-gray-300">
      {currentProduct.images && currentProduct.images[0] && (
        <div className="relative h-full w-full">
          <Image
            src={currentProduct.images[0]}
            alt={currentProduct.productname}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-500 ease-in-out "
          />
        </div>
      )}
      <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white/90 p-6 sm:p-10 rounded-xl text-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-2">
            Big Deals. Bigger Savings.
          </h2>
          <p className="text-gray-700 mb-4">
            Up to 50% off on select categories
          </p>
          <Button asChild>
            <Link href="/products">Shop Deals</Link>
          </Button>
        </div>
        {/* <CardTitle className="text-3xl font-bold text-white mb-2">
          {currentProduct.productname}
        </CardTitle> */}
        {/* <p className="text-xl text-white">
            ${price}
          </p> */}
      </CardContent>
    </Card>
  );
};
