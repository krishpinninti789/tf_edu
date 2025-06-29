"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
} from "lucide-react";

// Sample quiz data with mixed question types
const quizData = {
  "1": {
    id: "1",
    title: "General Knowledge",
    description: "Test your knowledge across various topics",
    questions: [
      {
        id: 1,
        type: "text",
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        explanation: "Paris is the capital and most populous city of France.",
      },
      {
        id: 2,
        type: "image",
        question: "What landmark is shown in this image?",
        image: "/placeholder.svg?height=300&width=400",
        options: ["Eiffel Tower", "Big Ben", "Statue of Liberty", "Colosseum"],
        correctAnswer: 0,
        explanation: "This is the iconic Eiffel Tower in Paris, France.",
      },
      {
        id: 3,
        type: "text",
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        explanation:
          "Mars is called the Red Planet due to its reddish appearance from iron oxide on its surface.",
      },
      {
        id: 4,
        type: "image",
        question: "Which animal is shown in this image?",
        image: "/placeholder.svg?height=300&width=400",
        options: ["Lion", "Tiger", "Leopard", "Cheetah"],
        correctAnswer: 1,
        explanation:
          "This is a tiger, recognizable by its distinctive orange coat with black stripes.",
      },
      {
        id: 5,
        type: "text",
        question: "What is the largest ocean on Earth?",
        options: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
          "Pacific Ocean",
        ],
        correctAnswer: 3,
        explanation:
          "The Pacific Ocean is the largest and deepest ocean on Earth.",
      },
    ],
  },
  "2": {
    id: "2",
    title: "Science & Nature",
    description: "Explore the wonders of science and nature",
    questions: [
      {
        id: 1,
        type: "text",
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        explanation: "Au comes from the Latin word 'aurum' meaning gold.",
      },
      {
        id: 2,
        type: "image",
        question: "What type of cloud is shown in this image?",
        image: "/placeholder.svg?height=300&width=400",
        options: ["Cumulus", "Stratus", "Cirrus", "Nimbus"],
        correctAnswer: 0,
        explanation:
          "Cumulus clouds are puffy, cotton-like clouds that form in fair weather.",
      },
    ],
  },
};

const motivationalMessages = [
  {
    min: 90,
    message: "Outstanding! You're a quiz master! 🏆",
    color: "text-yellow-600",
  },
  {
    min: 80,
    message: "Excellent work! You really know your stuff! 🌟",
    color: "text-green-600",
  },
  {
    min: 70,
    message: "Great job! You're doing really well! 👏",
    color: "text-blue-600",
  },
  {
    min: 60,
    message: "Good effort! Keep learning and improving! 📚",
    color: "text-purple-600",
  },
  {
    min: 0,
    message: "Don't give up! Every expert was once a beginner! 💪",
    color: "text-orange-600",
  },
];

export default function QuizPage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizStarted, setQuizStarted] = useState(false);

  const quiz = quizData[params.id as keyof typeof quizData];

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishQuiz();
    }
  }, [timeLeft, quizStarted, showResults]);

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Quiz not found</h1>
          <Link href="/">
            <Button>Back to Quizzes</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setShowResults(true);
  };

  const calculateResults = () => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      wrong: quiz.questions.length - correct,
      percentage: Math.round((correct / quiz.questions.length) * 100),
    };
  };

  const getMotivationalMessage = (percentage: number) => {
    return (
      motivationalMessages.find((msg) => percentage >= msg.min) ||
      motivationalMessages[motivationalMessages.length - 1]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">{quiz.title}</CardTitle>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {quiz.description}
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <Badge variant="outline">{quiz.questions.length} Questions</Badge>
              <Badge variant="outline">5 Minutes</Badge>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Quiz Instructions:</h3>
              <ul className="text-sm text-left space-y-1">
                <li>• Answer all questions to the best of your ability</li>
                <li>• You have 5 minutes to complete the quiz</li>
                <li>• Questions include both text and image-based formats</li>
                <li>• Click "Next" to move to the next question</li>
              </ul>
            </div>
            <Button
              size="lg"
              onClick={() => setQuizStarted(true)}
              className="w-full"
            >
              Start Quiz
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Quizzes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const results = calculateResults();
    const motivationalMsg = getMotivationalMessage(results.percentage);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-3xl mb-2">Quiz Complete!</CardTitle>
            <p className={`text-xl font-semibold ${motivationalMsg.color}`}>
              {motivationalMsg.message}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {results.percentage}%
              </div>
              <p className="text-gray-600 dark:text-gray-400">Overall Score</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {results.correct}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Correct
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {results.wrong}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wrong
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Question Review:</h3>
              {quiz.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <span className="text-sm">Question {index + 1}</span>
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => window.location.reload()}
                className="flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Quiz
              </Button>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Quizzes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(timeLeft)}
            </Badge>
            <Badge variant="outline">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image for image-based questions */}
            {currentQ.type === "image" && currentQ.image && (
              <div className="flex justify-center">
                <Image
                  src={currentQ.image || "/placeholder.svg"}
                  alt="Question image"
                  width={400}
                  height={300}
                  className="rounded-lg border shadow-md"
                />
              </div>
            )}

            {/* Answer Options */}
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value: any) =>
                handleAnswerSelect(Number.parseInt(value))
              }
            >
              <div className="grid gap-3">
                {currentQ.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer text-base"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentQuestion(Math.max(0, currentQuestion - 1))
                }
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestion] === undefined}
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
