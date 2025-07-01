import { getQuizById } from "@/lib/db/actions/quiz.actions";

import { notFound } from "next/navigation";
import { QuizClient } from "../../components/QuizClient";

interface QuizPageProps {
  params: {
    id: string;
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const resolvedParams = await params.id;
  const quiz = await getQuizById(resolvedParams);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <QuizClient quiz={quiz} />
    </div>
  );
}
