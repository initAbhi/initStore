import { NextResponse } from "next/server";
import User from "@/lib/db/models/UserSchema";
import { connectDB } from "@/lib/db/db";
import { auth } from "@/auth";

export async function POST(req) {
  const session = await auth();
  const data = await req.json();

  await connectDB();

  const currentUser = await User.findOne({ email: session?.user.email });

  // Check if product already exists in cart
  const existingItem = currentUser.cart.find((item) => {
    return item.product._id.toString() === data.product._id;
  });

  if (existingItem) {
    // If exists, update quantity
    existingItem.quantity = parseInt(existingItem.quantity) + parseInt(data.quantity);
  } else {
    // If not, push new item
    currentUser.cart.push({
      product: data.product,
      quantity: data.quantity,
    });
  }

  await currentUser.save();

  return NextResponse.json({ message: "Product added/updated in cart." });
}
