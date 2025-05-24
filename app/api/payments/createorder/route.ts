import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req, res) {
  const { amount, currency = "INR" } = await req.json();

  const options = {
    amount: amount,
    currency,
    receipt: `reciept_order_${Math.floor(Date.now() + Math.random() * 1000)}`,
  };
  try {
    const orderId = await razorpay.orders.create(options);
    return NextResponse.json(orderId);
  } catch (err) {
    return NextResponse.json(err);
  }
}
