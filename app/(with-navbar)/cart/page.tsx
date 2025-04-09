"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import SkeletonCard from "@/components/SkeletonCard";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import products from "razorpay/dist/types/products";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CartPage = () => {
  const session = useSession();
  // console.log(session);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handlePayment = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/payments/createorder`,
      {
        method: "POST",
        body: JSON.stringify({ amount: Math.floor(total) * 100 }),
      }
    );
    const order = await res.json();
    // console.log("order id", order.id);

    const options = {
      key: `${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID}`, // Replace with your Razorpay key_id
      amount: Math.floor(total) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "InitStore",
      description: "Test Transaction",
      order_id: order.id, // This is the order_id created in the backend
      // callback_url: `${process.env.NEXT_PUBLIC_URL}/payment-success`,
      handler: async function (response) {
        const handlerRes = response;
        // console.log(handlerRes);
        const resVerify = await fetch(
          `/api/payments/verifypayment`,
          {
            method: "POST",

            body: JSON.stringify({
              razorpay_payment_id: handlerRes?.razorpay_payment_id,
              user: session?.data?.user,
              razorpay_order_id: handlerRes?.razorpay_order_id,
              razorpay_signature: handlerRes?.razorpay_signature,
              orderDetails: {
                products: cart,
                amount: total,
              },
            }),
          }
        );
        const { isVerified } = await resVerify.json();
        if (isVerified) {
          router.push(`/payment-success`);
        } else {
          router.push(`/payment-failed`);
        }
      },
      prefill: {
        name: "Abhi Singh",
        email: "abhi@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#000000",
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
    setLoading(false);
  };
  const [cart, setCart] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch(
        `/api/cart/getusercart`
      );
      const { cart } = await response.json();
      setCart(cart);
      setIsLoading(false);
    };
    fetchCart();
  }, []);
  useEffect(() => {
    const updateCard = async () => {
      const response = await fetch(
        `/api/cart/updatecart`,
        {
          method: "POST",
          body: JSON.stringify(cart),
        }
      );
      const res = await response.json();
      console.log(res);
    };
    if (!isLoading) {
      updateCard();
    }
  }, [cart]);

  const updateQuantity = (id: number, newQty: number) => {
    setCart((prev: any) =>
      prev.map((item: any) =>
        item.product._id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev: any) => prev.filter((item: any) => item.product._id !== id));
  };

  const subtotal = cart.reduce(
    (acc: any, item: any) => acc + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-4 py-10">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <motion.h1
        className="text-4xl font-bold text-center text-gray-800 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your Cart
      </motion.h1>

      {isLoading ? (
        <div className="max-w-4xl mx-auto space-y-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : cart.length === 0 ? (
        <>
          <div className="flex justify-center flex-col gap-10 items-center">
            <p className="text-center text-xl text-gray-500">
              Your cart is empty.
            </p>
            <Button asChild className=" px-6 py-7 text-2xl text-white">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        </>
      ) : (
        <div className="grid md:grid-cols-3 gap-10 mx-auto max-w-7xl">
          <motion.div
            className="md:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {cart.map((item: any) => (
              <div
                key={item.product._id}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm"
              >
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.productname}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {item.product.productname}
                  </h2>
                  <p className="text-gray-500">${item.product.price} each</p>
                  <div className="mt-2 flex items-center gap-3">
                    <label className="text-sm">Qty:</label>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        updateQuantity(
                          item.product._id,
                          parseInt(e.target.value)
                        )
                      }
                      className="w-16 border border-gray-300 rounded-md px-2 py-1"
                    />
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-700">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="text-white text-sm mt-4 flex items-center gap-1 hover:underline bg-black px-3  py-2 rounded"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-md h-fit"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
