"use client";

import { useState, useMemo } from "react";

import QuizCollection from "@/app/(root)/components/QuizCollection";
import QuizFilter from "./QuizFilter";
import { QuizProps } from "@/types";

const QuizzesPage = ({ quizzes }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState("All Difficulties");

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz: QuizProps) => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        quiz.category === selectedCategory;

      const matchesDifficulty =
        selectedDifficulty === "All Difficulties" ||
        quiz.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty, quizzes]);

  return (
    <div className="p-6">
      <QuizFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedLevel={selectedDifficulty}
        onLevelChange={setSelectedDifficulty}
      />
      <QuizCollection quizzes={filteredQuizzes} allCount={quizzes.length} />
    </div>
  );
};

export default QuizzesPage;
