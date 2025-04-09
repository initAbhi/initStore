import { connectDB } from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/lib/db/models/ProductsSchema";

export async function POST(req: NextRequest, res: NextResponse){
    const body = await req.json()
// console.log("backend req body - ", body)
await connectDB();
const product = await Product.findById(body.productId);

// console.log("Product from db - ", product)



return NextResponse.json({message: "done",
    product
})
}