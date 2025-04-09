import { auth } from "@/auth"
import { connectDB } from "@/lib/db/db";
import UserSchema from "@/lib/db/models/UserSchema";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    const session = await auth();
    await connectDB();
    const user = await UserSchema.findOne({email: session?.user.email})
    
    return NextResponse.json({message: "done", cart: user.cart})
}