import Razorpay from "razorpay";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      // ✅ Signature is valid, save order to DB here
      // Replace this with your actual DB logic (e.g., Prisma, Mongo, etc.)
      // await saveOrderToDatabase({ ...orderDetails, razorpay_payment_id });

      return res.status(200).json({ success: true, message: "Payment verified & order saved" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
