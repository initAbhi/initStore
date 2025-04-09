// app/api/admin/orders/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import Orders from "@/lib/db/models/OrderSchema";

export async function GET() {
  await connectDB();

  try {
    const orders = await Orders.find().sort({ date: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders", error },
      { status: 500 }
    );
  }
}
