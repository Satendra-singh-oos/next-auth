import { connectDb } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: NextRequest, resopnse: NextResponse) {
  try {
    const resposne = NextResponse.json({
      message: "Logout Succesfuly",
      success: true,
    });

    resposne.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return resposne;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
