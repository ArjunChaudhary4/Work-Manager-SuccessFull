import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/user";
import { ConnectDb } from "@/helper/db";
interface Params {
  userid: string;
}
interface UserType {
  userName?: string;
  password?: string;
  email?: string;
}



export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await ConnectDb();
    const { userid } = params;
    const userData = await userModel.findById(userid);

    if (!userData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userData, { status: 200 });
  } 
  catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}


export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await ConnectDb();
    const { userid } = params;
    const UPDATED_DATA: UserType = await request.json();
    console.log('Received userid:', userid);

    const userData = await userModel.findById(userid)
    if (!userData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    await userModel.updateOne(
      { _id:userid },
      { $set: UPDATED_DATA }
    );

   
    return NextResponse.json(userData, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await ConnectDb();
    const { userid } = params;
    const result = await userModel.deleteOne({ _id:userid });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "User not Found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
