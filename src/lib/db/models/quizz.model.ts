import { IQuizz, IQuizzQuestion } from "@/types";
import mongoose, { Schema, type Document, model, models } from "mongoose";
import { Model } from "mongoose";

// Schema for a single quiz question
const QuizzQuestionSchema = new Schema<IQuizzQuestion>(
  {
    id: { type: Number, required: true },
    type: { type: String, required: true },
    question: { type: String, required: true },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length >= 2 && v.length <= 6,
        message: "A question must have between 2 and 6 options",
      },
    },
    correctAnswer: {
      type: Number,
      required: true,
      validate: {
        validator(this: IQuizzQuestion, v: number) {
          return v >= 0 && v < this.options.length;
        },
        message: "Correct answer index must be valid for the given options",
      },
    },
    explanation: { type: String, required: true },
  },
  { _id: false } // prevent automatic _id in subdocuments
);

// Schema for the quiz
const QuizzSchema = new Schema<IQuizz>(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    image: { type: String, required: true },
    duration: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    category: { type: String, required: true, trim: true, maxlength: 100 },
    questions: {
      type: [QuizzQuestionSchema],
      required: true,
      validate: {
        validator: (v: IQuizzQuestion[]) => v.length > 0 && v.length <= 50,
        message: "A quiz must have between 1 and 50 questions",
      },
    },
  },
  { timestamps: true }
);

// Indexes for better filtering
QuizzSchema.index({ category: 1 });
QuizzSchema.index({ difficulty: 1 });
QuizzSchema.index({ createdAt: -1 });

const Quizz: Model<IQuizz> =
  mongoose.models.Quizz || mongoose.model<IQuizz>("Quizz", QuizzSchema);

export default Quizz;
