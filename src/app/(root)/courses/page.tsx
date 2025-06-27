// app/(yourRoute)/page.tsx or BasicEducationPage.tsx
import { getAllCourses } from "@/lib/db/actions/course.actions";
import CoursesPage from "../components/CoursesPage";

const AllCoursesMainPage = async () => {
  const courses = await getAllCourses();
  return <CoursesPage courses={courses} />;
};

export default AllCoursesMainPage;
