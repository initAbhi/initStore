import { connectDB } from "@/lib/db/db";
import Product from "@/lib/db/models/ProductsSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, res: NextResponse) {
    await connectDB()
    const products = await Product.find({});

    return NextResponse.json({
        products: products
    })


}
