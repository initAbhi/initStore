// app/api/admin/products/route.ts
import { NextResponse } from "next/server";

import Product from "@/lib/db/models/ProductsSchema";
import { connectDB } from "@/lib/db/db";

export const GET = async () => {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
};
