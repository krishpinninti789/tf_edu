"use client";

import type { IQuiz } from "@/types";
import QuizCard from "./QuizCard";

interface QuizCollectionProps {
  quizzes: IQuiz[];
  allCount: number;
}

const QuizCollection = ({ quizzes, allCount }: QuizCollectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Available Quizzes
          <span className="text-lg font-normal text-gray-600 ml-2">
            ({quizzes.length} of {allCount})
          </span>
        </h2>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No quizzes found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search criteria or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizCollection;
