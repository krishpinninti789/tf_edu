import Course from "@/lib/db/models/course.model";
import connectDB from "@/lib/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    // console.log("ID from route:", id);

    const courseData = await Course.findOne({ id: id });

    return NextResponse.json({
      message: "Data received",
      courseData,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: (err as Error).message,
      },
      { status: 500 }
    );
  }
}
