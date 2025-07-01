import { getAllQuizzes, getQuizById } from "@/lib/db/actions/quiz.actions";
import QuizzesPage from "../components/QuizzesPage";

const AllQuizzesMainPage = async () => {
  const quizzes = await getAllQuizzes();

  return <QuizzesPage quizzes={quizzes} />;
};

export default AllQuizzesMainPage;
