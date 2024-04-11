import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDb();

export async function GET(request: NextRequest, resopnse: NextResponse) {
  try {
    const userId = await getDataFromToken(request);

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
    }

    // console.log(user);

    return NextResponse.json(
      { message: "User Found", data: user, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
