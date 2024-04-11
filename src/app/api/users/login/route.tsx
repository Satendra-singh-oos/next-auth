import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDb();

export async function POST(request: NextRequest, resopnse: NextResponse) {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "No User Found With Email" },
        { status: 403 }
      );
    }

    // console.log("User exist");

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Password Dosen't match" },
        { status: 403 }
      );
    }

    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "Loged In Success", success: true },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
