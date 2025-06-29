import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Trophy } from "lucide-react";
import { getAllQuizzes } from "@/lib/db/actions/quiz.actions";

export default async function QuizzesPage() {
  const quizzes = await getAllQuizzes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Quiz Challenge
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Test your knowledge with our collection of engaging quizzes. Choose
            your favorite topic and start learning!
          </p>
        </div>

        {/* Quiz Grid */}
        {quizzes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              No quizzes available at the moment.
            </p>
            <p className="text-gray-500 dark:text-gray-500">
              Please check back later or contact an administrator.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {quizzes.map((quiz: any) => (
              <Card
                key={quiz.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src={quiz.image || "/placeholder.svg"}
                    alt={quiz.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge
                    className="absolute top-3 right-3"
                    variant={
                      quiz.difficulty === "Easy"
                        ? "secondary"
                        : quiz.difficulty === "Medium"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {quiz.difficulty}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{quiz.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {quiz.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{quiz.questionCount} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{quiz.duration}</span>
                    </div>
                  </div>

                  <Badge variant="outline" className="w-fit">
                    {quiz.category}
                  </Badge>

                  <Link href={`/quiz/${quiz.id}`} className="block">
                    <Button className="w-full" size="lg">
                      <Trophy className="w-4 h-4 mr-2" />
                      Take Quiz
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {quizzes.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Available Quizzes
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {quizzes.reduce(
                  (acc: any, quiz: any) => acc + quiz.questionCount,
                  0
                )}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Total Questions
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                3
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Difficulty Levels
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
