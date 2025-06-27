import { notFound } from "next/navigation";
import CourseClient from "../../components/CourseClient";
import { getCourseById } from "@/lib/db/actions/course.actions";

export default async function CoursePage({
  params,
}: {
  params: { id: string };
}) {
  const resolvedParams = await params;
  // console.log(resolvedParams.id);
  const course = await getCourseById(resolvedParams.id);
  // console.log(course);

  if (!course) return notFound();

  return <CourseClient course={course} />;
}
