"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  RotateCcw,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { IQuizz } from "@/types";
import { CldImage } from "next-cloudinary";

interface QuizClientProps {
  quiz: IQuizz;
}

export function QuizClient({ quiz }: QuizClientProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [quizStarted, setQuizStarted] = useState(false);

  // Parse duration to seconds
  useEffect(() => {
    const parseDuration = (duration: string) => {
      const match = duration.match(/(\d+)\s*min/);
      return match ? Number.parseInt(match[1]) * 60 : 300;
    };
    setTimeLeft(parseDuration(quiz.duration));
  }, [quiz.duration]);

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowResults(true);
    }
  }, [timeLeft, quizStarted, showResults]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    const parseDuration = (duration: string) => {
      const match = duration.match(/(\d+)\s*min/);
      return match ? Number.parseInt(match[1]) * 60 : 300;
    };
    setTimeLeft(parseDuration(quiz.duration));
    setQuizStarted(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!quizStarted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white shadow-xl">
            <div className="relative">
              {/* <Image
                src={quiz.image || "/placeholder.svg?height=300&width=600"}
                alt={quiz.title}
                width={600}
                height={300}
                className="w-full h-64 object-cover rounded-t-lg"
              /> */}
              <CldImage
                width="300"
                height="200"
                src={quiz.image}
                alt="Description of my image"
                sizes="100vw"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <Badge
                  className={`${getDifficultyColor(
                    quiz.difficulty
                  )} font-medium`}
                >
                  {quiz.difficulty}
                </Badge>
              </div>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                {quiz.title}
              </CardTitle>
              <p className="text-gray-600 text-lg mb-6">{quiz.description}</p>
              <div className="flex justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  <span>{quiz.questions.length} questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{quiz.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="px-2 py-1">
                    {quiz.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={() => setQuizStarted(true)}
                className="bg-vprimary hover:bg-vsecondary cursor-pointer text-white px-8 py-3 text-lg"
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-xl mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                Quiz Complete!
              </CardTitle>
              <div className="text-6xl font-bold text-vprimary mb-2">
                {percentage}%
              </div>
              <p className="text-xl text-gray-600">
                You scored {score} out of {quiz.questions.length} questions
                correctly
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex justify-center gap-4">
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake Quiz
                </Button>
                <Link href="/quizes">
                  <Button className="bg-vprimary hover:bg-vsecondary text-white cursor-pointer">
                    Back to Quizzes
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Review Answers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {quiz.questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <div
                    key={question.id}
                    className="border-b pb-6 last:border-b-0"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {index + 1}. {question.question}
                          </h3>
                          {question.type === "image" && (
                            <ImageIcon className="w-4 h-4 text-blue-500" />
                          )}
                        </div>

                        {/* {question.image && question.type === "image" && (
                          <div className="mb-4">
                            <Image
                              src={question.image || "/placeholder.svg"}
                              alt="Question image"
                              width={400}
                              height={200}
                              className="rounded-lg border"
                            />
                          </div>
                        )} */}

                        <div className="space-y-2 mb-3">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded text-sm ${
                                optionIndex === question.correctAnswer
                                  ? "bg-green-100 text-green-800 border border-green-300"
                                  : optionIndex === userAnswer && !isCorrect
                                  ? "bg-red-100 text-red-800 border border-red-300"
                                  : "bg-gray-50 text-gray-700"
                              }`}
                            >
                              {option}
                              {optionIndex === question.correctAnswer && (
                                <Badge className="ml-2 bg-green-600">
                                  Correct
                                </Badge>
                              )}
                              {optionIndex === userAnswer && !isCorrect && (
                                <Badge className="ml-2 bg-red-600">
                                  Your Answer
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                          <p className="text-sm text-blue-800">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const currentQ = quiz.questions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            <div className="flex items-center gap-4">
              <Badge className={getDifficultyColor(quiz.difficulty)}>
                {quiz.difficulty}
              </Badge>
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="w-5 h-5" />
                <span
                  className={timeLeft < 60 ? "text-red-600" : "text-gray-700"}
                >
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Card className="bg-white shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-xl font-semibold text-gray-900">
                {currentQ.question}
              </CardTitle>
              {currentQ.type === "image" && (
                <ImageIcon className="w-5 h-5 text-blue-500" />
              )}
            </div>
            {/* {currentQ.image && currentQ.type === "image" && (
              <div className="mt-4">
                <Image
                  src={currentQ.image || "/placeholder.svg"}
                  alt="Question image"
                  width={500}
                  height={300}
                  className="rounded-lg border w-full max-w-md mx-auto"
                />
              </div>
            )} */}
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? "border-vprimary bg-orange-50 text-vsecondary"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-vprimary bg-vprimary"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            ))}

            <div className="flex justify-between pt-6">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="outline"
                className="cursor-pointer"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="bg-vprimary hover:bg-vsecondary text-white cursor-pointer"
              >
                {currentQuestion === quiz.questions.length - 1
                  ? "Finish Quiz"
                  : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
