import { NextResponse } from "next/server";

import Product from "@/lib/db/models/ProductsSchema";
import { connectDB } from "@/lib/db/db";



export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productname, description, images, category, price, ratings } = body;

    if (!productname || !description || !images?.length || !category || price == null || ratings == null) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const newProduct = new Product({
      productname,
      description,
      images,
      category,
      price,
      ratings,
    });

    await newProduct.save();

    return NextResponse.json({ message: "Product added successfully", product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
