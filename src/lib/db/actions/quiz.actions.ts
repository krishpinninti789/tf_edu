"use server";

import Quiz from "@/lib/db/models/quiz.model";
import type { IQuiz } from "@/types";
import connectDB from "../mongodb";
import Course from "../models/course.model";

export async function getAllQuizzes(): Promise<IQuiz[]> {
  try {
    await connectDB();

    const quizzes = await Quiz.find().sort({ createdAt: -1 }).lean();

    console.log(quizzes);

    return JSON.parse(JSON.stringify(quizzes));
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw new Error("Failed to fetch quizzes");
  }
}

export async function getQuizById(quizId: string): Promise<IQuiz | null> {
  try {
    await connectDB();

    const quiz = await Quiz.findOne({ id: quizId }).lean();

    if (!quiz) {
      return null;
    }

    return JSON.parse(JSON.stringify(quiz));
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw new Error("Failed to fetch quiz");
  }
}
