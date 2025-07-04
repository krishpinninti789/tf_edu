"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Users,
  Star,
  BookOpen,
  Award,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import VideoPlayer from "./VideoPlayer";

export default function CourseClient({ course }: { course: any }) {
  const router = useRouter();
  const [currentLessonId, setCurrentLessonId] = useState(
    course.parts?.[0]?.lessons?.[0]?.id || 1
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [showTextContent, setShowTextContent] = useState(false);

  const getCurrentLesson = () => {
    for (const part of course?.parts || []) {
      const lesson = part.lessons.find((l: any) => l.id === currentLessonId);
      if (lesson) return lesson;
    }
    return course?.parts[0]?.lessons[0];
  };

  const currentLesson = getCurrentLesson();

  const getAllLessons = () => {
    const allLessons: any[] = [];
    course?.parts.forEach((part: any) => {
      part.lessons.forEach((lesson: any) => {
        allLessons.push({ ...lesson, partTitle: part.title });
      });
    });
    return allLessons;
  };

  const allLessons = getAllLessons();
  const currentLessonIndex = allLessons.findIndex(
    (l) => l.id === currentLessonId
  );

  const goToNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonId(allLessons[currentLessonIndex + 1].id);
      setIsPlaying(false);
    }
  };

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonId(allLessons[currentLessonIndex - 1].id);
      setIsPlaying(false);
    }
  };

  const markLessonComplete = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const progressPercentage =
    (completedLessons.length / allLessons.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/courses")}
              className="flex items-center cursor-pointer bg-vprimary hover:bg-vsecondary hover:text-white text-white"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {course.category}
                  </Badge>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h1>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{course.learners} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.totalDuration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{course.totalLessons} lessons</span>
                </div>
                {course.certificate && (
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    <span>Certificate included</span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Course Progress</span>
                  <span>{Math.round(progressPercentage)}% Complete</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>

            {/* Video Player */}
            <Card>
              <CardContent className="p-0">
                <div className="relative w-full h-50 pb-[56.25%] self-center">
                  <VideoPlayer srcUrl={currentLesson.videoUrl} />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {currentLesson?.title}
                      </h3>
                      <p className="text-gray-600">
                        {currentLesson?.description}
                      </p>
                    </div>
                    <Button
                      onClick={() => markLessonComplete(currentLesson.id)}
                      disabled={completedLessons.includes(currentLesson.id)}
                      variant={
                        completedLessons.includes(currentLesson.id)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                    >
                      {completedLessons.includes(currentLesson.id) ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        "Mark Complete"
                      )}
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 items-center  lg:justify-between md:justify-between">
                    <Button
                      variant="outline"
                      onClick={goToPreviousLesson}
                      disabled={currentLessonIndex === 0}
                      className="cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={() => setShowTextContent(!showTextContent)}
                      variant="outline"
                      className="cursor-pointer"
                    >
                      {showTextContent ? "Hide" : "Show"} Lesson Notes
                    </Button>
                    <Button
                      onClick={goToNextLesson}
                      disabled={currentLessonIndex === allLessons.length - 1}
                      className="bg-vprimary hover:bg-vsecondary cursor-pointer"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lesson Notes */}
            {showTextContent && currentLesson?.textContent && (
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {currentLesson.textContent}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Level</p>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">{course.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Prerequisites</p>
                  <p className="font-medium">{course.prerequisites}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Skills you'll learn
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill: string) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <p className="text-sm text-gray-600">
                  {course.parts.length} parts • {allLessons.length} lessons
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {course.parts.map((part: any) => (
                  <div key={part.id}>
                    <h4 className="font-medium text-gray-900 mb-2">
                      {part.title}
                    </h4>
                    <div className="space-y-2">
                      {part.lessons.map((lesson: any) => (
                        <button
                          key={lesson.id}
                          onClick={() => setCurrentLessonId(lesson.id)}
                          className={`w-full text-left p-3 rounded-lg border cursor-pointer transition-colors ${
                            currentLessonId === lesson.id
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {completedLessons.includes(lesson.id) ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <Play className="h-4 w-4 text-gray-400" />
                              )}
                              <div>
                                <p className="text-sm font-medium">
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {lesson.duration}
                                </p>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Instructor Info */}
            <Card>
              <CardHeader>
                <CardTitle>Your Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-vprimary rounded-full flex items-center justify-center text-white font-bold">
                    {course.instructor
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium">{course.instructor}</p>
                    <p className="text-sm text-gray-600">
                      {course.instructorBio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
