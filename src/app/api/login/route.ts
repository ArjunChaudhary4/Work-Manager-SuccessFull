import { ConnectDb } from "@/helper/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
var jwt = require("jsonwebtoken");

interface loginType {
  password: string;
  email: string;
}

export async function POST(request: NextRequest) {
  const { email, password }: loginType = await request.json();
  if (!email || !password) {
    return NextResponse.json({
      message: "All fields are Required",
    });
  }
  try {
    await ConnectDb();
    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json(
        {
          message: "User Not Found",
        },
        { status: 401 }
      );
    }

    if (!(await user.comparePassword(password))) {
      return NextResponse.json(
        {
          message: "Password not match",
        },
        { status: 401 }
      );
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JSONWEBTOKEN_SECRETKEY,
      { expiresIn: "1D" }
    );

    const response = NextResponse.json({
      message: "user found to be login",
      token,
      user,
    });
    response.cookies.set("loginToken", token, {
      expires: new Date(Date.now() + 36000000), // 10 hour in milliseconds
    });
    return response;
  } catch (error) {
    console.log(" Login Error ",error);
  }
}

export async function GET(request: NextRequest) {
  await ConnectDb();
  const cookie = request.cookies.get("loginToken");
  if (!cookie) {
    return NextResponse.json({
      isLoggedIn: false,
    });
  } else {
    try {
      const userId = jwt.verify(
        cookie.value,
        process.env.JSONWEBTOKEN_SECRETKEY
      );
      if (userId) {
        return NextResponse.json({
          isLoggedIn: true,
          userId,
        });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        isLoggedIn: false,
      });
    }
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Successfully log out",
    });
    response.cookies.set("loginToken", "", {
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Logout fails",
    });
  }
}
