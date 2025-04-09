import { projectOnExit } from "next/dist/build/swc/generated-native";
import React from "react";
import Stripe from "stripe";
import ProductCard from "./ProductCard";

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



const ProductList = ({products}: {products: Product[]}) => {
  // console.log("list - ", products)
  return (
    <div>
      <div>
        {/* <input type="text" placeholder="Search products..." /> */}
      </div>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, key) => {
          return (
              <li key={key}>
                <ProductCard product={product} />
              </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
