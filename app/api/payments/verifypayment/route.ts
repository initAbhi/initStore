import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import OrderSchema from "@/lib/db/models/OrderSchema";
import { connectDB } from "@/lib/db/db";

export async function POST(req) {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderDetails,
    user,
  } = await req.json();
  //   console.log("razorpay_order_id:", razorpay_order_id); // should be a string
  //   console.log("razorpay_payment_id:", razorpay_payment_id);
  //   console.log("razorpay_signature:", razorpay_signature);
  const secret = process.env.RAZORPAY_KEY_SECRET!;
  const isValid = validatePaymentVerification(
    { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
    razorpay_signature,
    secret!
  );

  if (isValid) {
    await connectDB();
    console.log(
      "order details - ",
      orderDetails,
      "amount = ",
      orderDetails.amount
    );
    const createdOrder = await OrderSchema.create({
      user,
      products: orderDetails.products,
      amount: orderDetails.amount,
      orderId: razorpay_order_id,
    });

    return NextResponse.json({ isVerified: true, orderId: razorpay_order_id });
  } else {
    return NextResponse.json({ isVerified: false, orderId: razorpay_order_id });
  }
}
