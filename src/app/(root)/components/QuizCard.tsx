"use client";

import type { IQuiz } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Trophy, BookOpen, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface QuizCardProps {
  quiz: IQuiz;
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white overflow-hidden">
      <div className="relative">
        <Image
          src={quiz.image || "/placeholder.svg?height=200&width=300"}
          alt={quiz.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="bg-white/90 text-gray-700 font-medium"
          >
            {quiz.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge
            className={`${getDifficultyColor(
              quiz.difficulty
            )} font-medium border`}
          >
            {quiz.difficulty}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {quiz.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {quiz.description}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-blue-500" />
            <span>{quiz.questions.length} questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-500" />
            <span>{quiz.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-500" />
            <span>{quiz.difficulty}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-500" />
            <span>{formatDate(quiz.createdAt)}</span>
          </div>
        </div>

        <Link href={`/quiz/${quiz.id}`} className="block">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 transition-all duration-200">
            Start Quiz
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
