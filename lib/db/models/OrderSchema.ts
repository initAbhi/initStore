import mongoose from "mongoose";
import products from "razorpay/dist/types/products";

const OrderSchema = new mongoose.Schema({
  user: {},
  products: [],
  orderId: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Orders || mongoose.model("Orders", OrderSchema);
