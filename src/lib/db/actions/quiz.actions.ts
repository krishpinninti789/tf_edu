"use server";

// import connectDB from "@/lib/mongoose"
// import Quiz from "@/models/Quiz"
import { CreateQuizInput, QuizSummary } from "@/types";
import connectDB from "../mongodb";
import Quiz from "../models/quiz.model";
import { Quiz as QuizType } from "@/types";

export async function getAllQuizzes(): Promise<QuizSummary[]> {
  try {
    await connectDB();

    const quizzes = await Quiz.find({})
      .select(
        "id title description image duration difficulty category createdAt updatedAt"
      )
      .sort({ createdAt: -1 })
      .lean();

    return quizzes.map((quiz) => ({
      _id: quiz._id?.toString(),
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      image: quiz.image,
      questionCount: quiz.questions?.length || 0,
      duration: quiz.duration,
      difficulty: quiz.difficulty,
      category: quiz.category,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return [];
  }
}

export async function getQuizById(id: string): Promise<QuizType | null> {
  try {
    await connectDB();

    const quiz = await Quiz.findOne({ id }).lean();

    if (!quiz) {
      return null;
    }

    return JSON.parse(JSON.stringify(quiz));
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return null;
  }
}

export async function createQuiz(
  quizData: CreateQuizInput
): Promise<{ success: boolean; message: string; quiz?: QuizType }> {
  try {
    await connectDB();

    // Check if quiz with this ID already exists
    const existingQuiz = await Quiz.findOne({ id: quizData.id });
    if (existingQuiz) {
      return {
        success: false,
        message: "A quiz with this ID already exists",
      };
    }

    const quiz = new Quiz(quizData);
    await quiz.save();

    return {
      success: true,
      message: "Quiz created successfully",
      quiz: {
        _id: quiz._id?.toString(),
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        image: quiz.image,
        questions: quiz.questions,
        duration: quiz.duration,
        difficulty: quiz.difficulty,
        category: quiz.category,
        questionCount: quiz.questions.length,
        createdAt: quiz.createdAt,
        updatedAt: quiz.updatedAt,
      },
    };
  } catch (error) {
    console.error("Error creating quiz:", error);
    return {
      success: false,
      message: "Failed to create quiz",
    };
  }
}

export async function getQuizzesByCategory(
  category: string
): Promise<QuizSummary[]> {
  try {
    await connectDB();

    const quizzes = await Quiz.find({ category })
      .select(
        "id title description image duration difficulty category createdAt updatedAt"
      )
      .sort({ createdAt: -1 })
      .lean();

    return quizzes.map((quiz) => ({
      _id: quiz._id?.toString(),
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      image: quiz.image,
      questionCount: quiz.questions?.length || 0,
      duration: quiz.duration,
      difficulty: quiz.difficulty,
      category: quiz.category,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching quizzes by category:", error);
    return [];
  }
}

export async function getQuizzesByDifficulty(
  difficulty: "Easy" | "Medium" | "Hard"
): Promise<QuizSummary[]> {
  try {
    await connectDB();

    const quizzes = await Quiz.find({ difficulty })
      .select(
        "id title description image duration difficulty category createdAt updatedAt"
      )
      .sort({ createdAt: -1 })
      .lean();

    return quizzes.map((quiz) => ({
      _id: quiz._id?.toString(),
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      image: quiz.image,
      questionCount: quiz.questions?.length || 0,
      duration: quiz.duration,
      difficulty: quiz.difficulty,
      category: quiz.category,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching quizzes by difficulty:", error);
    return [];
  }
}

export async function searchQuizzes(
  searchTerm: string
): Promise<QuizSummary[]> {
  try {
    await connectDB();

    const quizzes = await Quiz.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
      ],
    })
      .select(
        "id title description image duration difficulty category createdAt updatedAt"
      )
      .sort({ createdAt: -1 })
      .lean();

    return quizzes.map((quiz) => ({
      _id: quiz._id?.toString(),
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      image: quiz.image,
      questionCount: quiz.questions?.length || 0,
      duration: quiz.duration,
      difficulty: quiz.difficulty,
      category: quiz.category,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
    }));
  } catch (error) {
    console.error("Error searching quizzes:", error);
    return [];
  }
}

export async function getQuizStats() {
  try {
    await connectDB();

    const [totalQuizzes, categories, difficulties] = await Promise.all([
      Quiz.countDocuments(),
      Quiz.distinct("category"),
      Quiz.distinct("difficulty"),
    ]);

    const totalQuestions = await Quiz.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $size: "$questions" } },
        },
      },
    ]);

    return {
      totalQuizzes,
      totalQuestions: totalQuestions[0]?.total || 0,
      totalCategories: categories.length,
      totalDifficulties: difficulties.length,
      categories,
      difficulties,
    };
  } catch (error) {
    console.error("Error fetching quiz stats:", error);
    return {
      totalQuizzes: 0,
      totalQuestions: 0,
      totalCategories: 0,
      totalDifficulties: 0,
      categories: [],
      difficulties: [],
    };
  }
}
