import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import Orders from "@/lib/db/models/OrderSchema";


export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const orders = await Orders.find({ "user.email": email }).sort({ date: -1 });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
