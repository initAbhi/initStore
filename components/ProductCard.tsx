"use client"
import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import Image from "next/image";
import { Button } from "./ui/button";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

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
    <Link href={`/products/${product._id}`} className="block h-full">
      <Card className="group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col border-gray-300 gap-0">
        {product.images && product.images[0] && (
          <div className="relative h-60 w-full">
            <Image
              src={product.images[0]}
              alt={product.productname}
              layout="fill"
              objectFit="cover"
              className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
            />
          </div>
        )}
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold text-gray-800">
            {product.productname}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          {product.description && (
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
          )}
          <p className="text-lg font-semibold text-gray-900">
             ${product.price}
            </p>
          <Button className="mt-4 bg-black text-white">View Details</Button>
          {/* <Button onClick={() => {
            router.push("/home")
          }} className="mt-4 bg-black text-white">add to cart 🛒</Button> */}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard