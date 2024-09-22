import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import WorkModel from "@/models/work";
import { ConnectDb } from "@/helper/db";

interface workType {
  Title: string;
  Description: string;
  Author: string;
  user: mongoose.ObjectId;
}


export async function POST(request: Request) {
  try {
    await ConnectDb();
    const { Title, Description, Author, user }: workType = await request.json();
    if (!Title || !Description || !Author || !user) {
      NextResponse.json({
        message: "All fields are Required",
      });
    }
    const newWork = await WorkModel.create({
      Title,
      Description,
      Author,
      user
    });
    return NextResponse.json(
      {
        message: "New Work added Successfully",
        newWork,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "New Work not added unSuccessfully",
      },
      { status: 401 }
    );
  }
}

export async function GET(request:NextRequest){
try {
  const userallWork = await WorkModel.find();
  if(!userallWork){
    return NextResponse.json({
      message:"No user Exist"
    })
  }
  return NextResponse.json(userallWork)
} catch (error) {
  console.log(error);
  
}}
