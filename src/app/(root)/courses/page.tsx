"use client";

import { useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  Users,
  Clock,
  Star,
  Award,
  Play,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

const educationBasics = [
  {
    id: 1,
    title: "Reading & Writing Fundamentals",
    description:
      "Learn to read and write from scratch - letters, words, sentences, and basic grammar",
    category: "Literacy",
    level: "Foundation",
    duration: "3-6 months",
    lessons: 45,
    learners: "89,000+",
    rating: 4.9,
    skills: [
      "Alphabet Recognition",
      "Phonics",
      "Basic Writing",
      "Simple Grammar",
    ],
    prerequisites: "None - Start from zero",
    image: "/placeholder.svg?height=200&width=300",
    progress: 0,
    isRecommended: true,
  },
  {
    id: 2,
    title: "Numbers & Basic Math",
    description:
      "Master counting, addition, subtraction, and everyday math you need in daily life",
    category: "Numeracy",
    level: "Foundation",
    duration: "2-4 months",
    lessons: 38,
    learners: "76,000+",
    rating: 4.8,
    skills: [
      "Counting",
      "Basic Operations",
      "Money Math",
      "Time & Measurement",
    ],
    prerequisites: "None - Start from zero",
    image: "/placeholder.svg?height=200&width=300",
    progress: 0,
    isRecommended: true,
  },
  {
    id: 3,
    title: "Speaking & Listening Skills",
    description:
      "Improve your communication through clear speaking and active listening techniques",
    category: "Communication",
    level: "Foundation",
    duration: "2-3 months",
    lessons: 25,
    learners: "54,000+",
    rating: 4.7,
    skills: [
      "Clear Speech",
      "Active Listening",
      "Basic Conversation",
      "Body Language",
    ],
    prerequisites: "None - Start from zero",
    image: "/placeholder.svg?height=200&width=300",
    progress: 0,
    isRecommended: true,
  },
  {
    id: 4,
    title: "Critical Thinking Basics",
    description:
      "Learn to analyze information, solve problems, and make better decisions",
    category: "Thinking Skills",
    level: "Foundation",
    duration: "2-3 months",
    lessons: 20,
    learners: "43,000+",
    rating: 4.6,
    skills: [
      "Problem Solving",
      "Decision Making",
      "Logical Thinking",
      "Question Asking",
    ],
    prerequisites: "Basic reading recommended",
    image: "/placeholder.svg?height=200&width=300",
    progress: 0,
  },
  {
    id: 5,
    title: "Computer & Internet Basics",
    description:
      "Get comfortable with computers, smartphones, and using the internet safely",
    category: "Digital Skills",
    level: "Foundation",
    duration: "1-2 months",
    lessons: 18,
    learners: "67,000+",
    rating: 4.5,
    skills: [
      "Device Operation",
      "Internet Navigation",
      "Email Basics",
      "Online Safety",
    ],
    prerequisites: "None - Start from zero",
    image: "/placeholder.svg?height=200&width=300",
    progress: 0,
  },
  {
    id: 6,
    title: "Health & Personal Care",
    description:
      "Essential knowledge about health, hygiene, nutrition, and taking care of yourself",
    category: "Life Skills",
    level: "Foundation",
    duration: "1-2 months",
    lessons: 15,
    learners: "38,000+",
    rating: 4.4,
    skills: [
      "Personal Hygiene",
      "Basic Nutrition",
      "Health Awareness",
      "First Aid Basics",
    ],
    prerequisites: "None - Start from zero",
    image: "/placeholder.svg?height=200&width=300",
    progress: 0,
  },
  {
    id: 7,
    title: "Money & Financial Basics",
    description:
      "Understand money, budgeting, banking, and managing your finances safely",
    category: "Life Skills",
    level: "Foundation",
    duration: "2-3 months",
    lessons: 22,
    learners: "52,000+",
    rating: 4.6,
    skills: [
      "Money Recognition",
      "Basic Banking",
      "Budgeting",
      "Avoiding Scams",
    ],
    prerequisites: "Basic math recommended",
    image: "/placeholder.svg?height=200&width=300",
    progress: 0,
  },
  {
    id: 8,
    title: "Learning How to Learn",
    description:
      "Develop study habits, memory techniques, and strategies for lifelong learning",
    category: "Study Skills",
    level: "Foundation",
    duration: "1-2 months",
    lessons: 12,
    learners: "29,000+",
    rating: 4.7,
    skills: [
      "Study Methods",
      "Memory Techniques",
      "Note Taking",
      "Goal Setting",
    ],
    prerequisites: "Basic reading recommended",
    image: "/placeholder.svg?height=200&width=300",
    progress: 0,
  },
  {
    id: 9,
    title: "Social Skills & Relationships",
    description:
      "Build confidence in social situations and develop healthy relationships",
    category: "Social Skills",
    level: "Foundation",
    duration: "2-3 months",
    lessons: 16,
    learners: "35,000+",
    rating: 4.5,
    skills: [
      "Social Confidence",
      "Friendship Building",
      "Conflict Resolution",
      "Empathy",
    ],
    prerequisites: "None - Start from zero",
    image: "/placeholder.svg?height=200&width=300",
    progress: 0,
  },
  {
    id: 10,
    title: "Work & Career Readiness",
    description:
      "Prepare for the working world with job search skills and workplace basics",
    category: "Career Skills",
    level: "Intermediate",
    duration: "2-4 months",
    lessons: 28,
    learners: "41,000+",
    rating: 4.6,
    skills: [
      "Job Applications",
      "Interview Skills",
      "Workplace Behavior",
      "Resume Writing",
    ],
    prerequisites: "Reading & writing basics",
    image: "/placeholder.svg?height=200&width=300",
    progress: 0,
  },
];

const categories = [
  "All Categories",
  "Literacy",
  "Numeracy",
  "Communication",
  "Thinking Skills",
  "Digital Skills",
  "Life Skills",
  "Study Skills",
  "Social Skills",
  "Career Skills",
];

const levels = ["All Levels", "Foundation", "Intermediate", "Advanced"];

export default function BasicEducationPlatform() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const router = useRouter();

  const handleCourseStart = (courseId: number) => {
    router.push(`/courses/${courseId}`);
  };

  const filteredCourses = useMemo(() => {
    return educationBasics.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All Categories" ||
        course.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All Levels" || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchTerm, selectedCategory, selectedLevel]);

  const recommendedCourses = educationBasics.filter(
    (course) => course.isRecommended
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex  items-center justify-end py-6">
            <div className="flex items-center space-x-4">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                100% Free Forever
              </Badge>
              <Button variant="outline">Free Access</Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Master the Basics of Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start your learning journey from the very beginning. No prior
            education needed - we'll teach you reading, writing, math, and
            essential life skills step by step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <Play className="h-5 w-5 mr-2" />
              Start with Reading & Writing
            </Button>
            <Button size="lg" variant="outline">
              Take Assessment Test
            </Button>
          </div>
        </div>

        {/* Recommended Learning Path */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-green-600" />
            Recommended Learning Path for Beginners
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedCourses.map((course, index) => (
              <div
                key={course.id}
                className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{course.title}</p>
                  <p className="text-sm text-gray-600">{course.duration}</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for subjects or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Subject Area" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {educationBasics.length} basic
            education courses
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="hover:shadow-lg transition-shadow duration-200 relative"
            >
              {course.isRecommended && (
                <Badge className="absolute top-4 right-4 bg-green-600 z-10">
                  Recommended
                </Badge>
              )}
              <div className="aspect-video bg-gradient-to-r from-green-400 to-blue-500 rounded-t-lg"></div>
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
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.learners}</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-blue-100 text-blue-800"
                    >
                      {course.level}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      What you'll learn:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {course.skills.slice(0, 3).map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {course.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{course.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">
                      Prerequisites: {course.prerequisites}
                    </p>
                    {course.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <Badge className="bg-green-100 text-green-800">
                      100% Free
                    </Badge>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleCourseStart(course.id)}
                    >
                      {course.progress > 0 ? "Continue" : "Start Course"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
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

        {/* Support Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 mt-12 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            You're Not Alone in This Journey
          </h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Learning is easier when you have support. Join our community of
            learners who started just like you. Get help from teachers and
            fellow students every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Join Learning Community
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-green-600"
            >
              Get One-on-One Help
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Start from Zero</h4>
            <p className="text-gray-600">
              No prior education needed. We begin with the absolute basics and
              build up gradually.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Learn at Your Pace</h4>
            <p className="text-gray-600">
              Take as much time as you need. Repeat lessons until you feel
              confident.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Real-World Skills</h4>
            <p className="text-gray-600">
              Learn practical skills you can use immediately in daily life and
              work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
