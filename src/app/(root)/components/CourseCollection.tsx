"use client";

import { Course } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { BookOpen, Clock, Users, Star } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

type Props = {
  courses: Course[];
  allCount: number;
};

const Collection = ({ courses, allCount }: Props) => {
  const router = useRouter();

  const handleCourseStart = (id: number) => {
    router.push(`/courses/${id}`);
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Showing {courses.length} of {allCount} basic education courses
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg relative">
            {course.isRecommended && (
              <Badge className="absolute top-4 right-4 bg-green-600 z-10">
                Recommended
              </Badge>
            )}

            <CldImage
              width="500"
              height="500"
              src={course.image}
              alt="Description of my image"
              sizes="100vw"
            />

            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="text-xs">
                  {course.category}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              </div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription className="text-sm">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" /> {course.lessons} lessons
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> {course.learners}
                </div>
                <Badge
                  variant="secondary"
                  className="text-xs bg-blue-100 text-blue-800"
                >
                  {course.level}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">
                  Prerequisites: {course.prerequisites}
                </p>
                {course.progress > 0 && (
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                )}
              </div>
              <div className="flex justify-between pt-4">
                <Badge className="bg-green-100 text-green-800">100% Free</Badge>
                <Button
                  size="sm"
                  className="bg-vprimary hover:bg-vsecondary cursor-pointer"
                  onClick={() => handleCourseStart(course.id)}
                >
                  {course.progress > 0 ? "Continue" : "Start Course"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No courses found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default Collection;
