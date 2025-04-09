import { connectDB } from "@/lib/db/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import UserSchema from "@/lib/db/models/UserSchema";

export async function POST(req) {
    const body = await req.json();
    await connectDB();
    const session = await auth()
    const user = await UserSchema.findOne({email: session?.user.email});
    user.cart = body
    await user.save()

    return NextResponse.json({upadated : user})

}