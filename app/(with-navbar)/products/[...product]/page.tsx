"use client";

import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LoaderNew from "@/components/LoaderNew";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CustomToast = ({ closeToast }: { closeToast?: () => void }) => {
  const router = useRouter();
  // console.log("toast invoked");
  return (
    <div className="max-w-none w-[800px] px-6 py-3 text-black rounded-lg shadow-lg  flex items-center justify-around">
      <span>Item added to cart!</span>
      <button
        className="ml-4 bg-blue-600 text-white px-2 py-1 rounded"
        onClick={() => {
          router.push("/cart");
        }}
      >
        Cart 🛒
      </button>
    </div>
  );
};

const page = ({ params }: any) => {
  const [productData, setproductData] = useState<any>();
  const quantity = useRef<any>(null);
  const showToast = () => {
    // console.log("showtoast called");
    toast(<CustomToast />, {
      progressClassName: "bg-yellow-500",
    });
  };

  const handleAddToCart = async () => {
    // console.log("quantity", quantity.current.value);
    const response = await fetch(
      `/api/cart/addtocart`,
      {
        method: "POST",
        body: JSON.stringify({
          product: productData,
          quantity: quantity.current.value,
        }),
      }
    );
    const res = await response.json();
    // console.log("frontend - ", res);
    quantity.current.value = 1;
    showToast();
  };

  useEffect(() => {
    const fetchData = async () => {
      const productId = await params;
      window.scrollTo(0, 0);
      const productdetails = await fetch(
        `/api/products/getproduct`,
        {
          method: "POST",
          body: JSON.stringify({
            productId: productId.product[0],
            message: "hello",
          }),
        }
      );
      const { product } = await productdetails.json();
      setproductData(product);
      // console.log(product);
    };
    fetchData();
  }, []);

  if (!productData)
    return (
      <div className="flex min-h-screen w-full justify-center items-center">
        <LoaderNew />
      </div>
    );
  else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-50 min-h-screen"
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="w-full max-w-md h-[400px] sm:h-[500px] relative">
                <Image
                  src={productData.images[0]}
                  alt="Product Image"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                {productData.productname}
              </h1>

              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Product Description
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {productData.description}
                </p>

                <div className="mb-4">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantity
                  </label>
                  <input
                    ref={quantity}
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    defaultValue="1"
                    className="w-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-6">
                  <span className="text-2xl font-semibold text-green-600">
                    ${productData.price}
                  </span>
                  <span className="text-gray-400 line-through ml-2">
                    ${(productData.price - 20).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-800 transition duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }
};

export default page;
