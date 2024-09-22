import mongoose from "mongoose";
import { NextResponse } from "next/server";

const mongoUri = process.env.MONGODB_URI;

export const ConnectDb = async () => {
  try {
    if (!mongoUri) {
      throw new Error("MONGODB_URI environment variable is not set");
    }
    await mongoose.connect(mongoUri, { dbName: "NextJs_Project" });
    NextResponse.json({
      message: "Connected to database",
    });
    console.log("Connected to database");
  } catch (error) {
    NextResponse.json({
      message: "Error in connecting to database",
      error,
    });
    console.log("Error in connecting to database", error);
  }
};
