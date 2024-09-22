import { NextRequest, NextResponse } from "next/server";
import workModel from "@/models/work";
import { ConnectDb } from "@/helper/db";

interface Params {
  userid: string;
}


export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await ConnectDb();
    const { userid } = params;
    const workData = await workModel.find({ user: userid });
    console.log("Received userid:", userid);

    if (!workData) {
      return NextResponse.json({ message: "Work not found" }, { status: 404 });
    }

    return NextResponse.json(workData, { status: 200 });
  } catch (error) {
    console.error("Error fetching work:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}