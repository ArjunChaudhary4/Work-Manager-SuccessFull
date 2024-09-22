import { NextRequest, NextResponse } from "next/server";
import workModel from "@/models/work";
import { ConnectDb } from "@/helper/db";

interface Params {
  workid: string;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await ConnectDb();
    const { workid } = params;
    const { status } = await request.json();

    const updatedWork = await workModel.findByIdAndUpdate(
      workid,
      { $set: { status } },
      { new: true }
    );

    if (!updatedWork) {
      return NextResponse.json({ message: "Work not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Status Updated", updatedWork },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { message: "Status not Changed", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await ConnectDb();
    const { workid } = params;
    const result = await workModel.deleteOne({ _id: workid });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Work not Found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Work Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Work not Deleted" }, { status: 401 });
  }
}
