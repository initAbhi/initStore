"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-green-50 p-6 text-center">
      <CheckCircle className="text-green-500 w-20 h-20 mb-6" />
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <Link href="/products">
        <Button className="bg-black hover:bg-gray-800 text-white px-6 py-8 text-2xl rounded">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};

export default PaymentSuccessPage;
