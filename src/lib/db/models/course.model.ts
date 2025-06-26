import { ICourse, Lesson, Part } from "@/types";
import mongoose, { Schema, Model, model, models } from "mongoose";

const LessonSchema = new Schema<Lesson>({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  type: { type: String, required: true },
  videoUrl: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  textContent: { type: String, required: true },
});

const PartSchema = new Schema<Part>({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  lessons: { type: [LessonSchema], required: true },
});

const CourseSchema = new Schema<ICourse>(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true },
    duration: { type: String, required: true },
    totalLessons: { type: Number, required: true },
    learners: { type: String, required: true },
    rating: { type: Number, required: true },
    instructor: { type: String, required: true },
    instructorBio: { type: String, required: true },
    skills: { type: [String], required: true },
    prerequisites: { type: String, required: true },
    image: { type: String, required: true },
    completedLessons: { type: Number, default: 0 },
    totalDuration: { type: String, required: true },
    certificate: { type: Boolean, default: false },
    parts: { type: [PartSchema], required: true },
  },
  { timestamps: true }
);

const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
export default Course;

CourseSchema.index({ _id: 1 });
