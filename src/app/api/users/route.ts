import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/user";
import { ConnectDb } from "@/helper/db";

interface UserType {
  userName: string;
  password: string;
  email: string;
}


export async function POST(request: NextRequest) {
  try {
    ConnectDb()
    const { userName, email, password }: UserType = await request.json();

    if (!userName || !email || !password) {
     return NextResponse.json({
        message: "All fields are Required",
      });
    }
    const newUser = await userModel.create({
      userName,
      email,
      password,
    });
    return NextResponse.json(
      {
        message: "User Created Successfully",
        newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request:NextRequest){
try {
  ConnectDb();
  const allUsersData = await userModel.find()
  if(!allUsersData){
    return NextResponse.json({
      message:"No user Exist"
    })
  }  
  return NextResponse.json(allUsersData)
} catch (error) {
  console.log(error);
  
}}
