"use server";

import type { IQuizz } from "@/types";
import connectDB from "../mongodb";
import Quizz from "../models/quizz.model";

export async function getAllQuizzes(): Promise<IQuizz[]> {
  try {
    await connectDB();

    const quizzes = await Quizz.find({}).sort({ createdAt: -1 }).lean();

    // console.log(quizzes);

    return JSON.parse(JSON.stringify(quizzes));
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw new Error("Failed to fetch quizzes");
  }
}

export async function getQuizById(quizId: string): Promise<IQuizz | null> {
  try {
    await connectDB();

    const quiz = await Quizz.findOne({ id: quizId }).lean();

    if (!quiz) {
      return null;
    }

    return JSON.parse(JSON.stringify(quiz));
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw new Error("Failed to fetch quiz");
  }
}
