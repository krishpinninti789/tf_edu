"use server";

import Course from "../models/course.model";
import connectDB from "../mongodb";

export async function getAllCourses() {
  try {
    await connectDB();
    const courses = await Course.find().lean();
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { success: false, message: "Failed to retrieve courses." };
  }
}

export async function getCourseById(id: any) {
  try {
    connectDB();
    const course = await Course.findOne({ id: id }).lean();
    // console.log(course);

    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    return { success: false, message: "Failed to get course data." };
  }
}
