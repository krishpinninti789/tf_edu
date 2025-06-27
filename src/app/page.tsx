import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Brain,
  Volume2,
  ImageIcon,
  Wifi,
  Globe,
  CheckCircle,
  Play,
  Users,
  Award,
  Smartphone,
  Download,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary" className="mb-4">
                  <Wifi className="w-4 h-4 mr-1" />
                  Works Offline
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Learn Anywhere, Anytime
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Interactive lessons with quizzes, audio support, and offline
                  capabilities. Available in multiple languages for learners
                  worldwide.
                </p>
              </div>
              <div className="space-x-4">
                <Button
                  size="lg"
                  className="bg-vprimary hover:bg-vsecondary cursor-pointer"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Learning
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-gray-700 border-gray-300"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Learning Features
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl mt-4">
                Everything you need for an engaging and effective learning
                experience
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>Static Lessons</CardTitle>
                  <CardDescription>
                    Comprehensive lesson content that loads instantly and works
                    offline
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Rich text content
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Fast loading
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Offline access
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <Brain className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle>Interactive Quizzes</CardTitle>
                  <CardDescription>
                    Test your knowledge with integrated quiz modules
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Multiple choice questions
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Instant feedback
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Progress tracking
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Volume2 className="h-10 w-10 text-green-600" />
                    <ImageIcon className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle>Rich Media Support</CardTitle>
                  <CardDescription>
                    Enhanced learning with audio narration and visual content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Audio narration
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      High-quality images
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Visual learning aids
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* PWA & Offline Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">
                    <Smartphone className="w-4 h-4 mr-1" />
                    Progressive Web App
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Learn Without Limits
                  </h2>
                  <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our PWA technology ensures you can access your lessons
                    anywhere, even without an internet connection. Install it on
                    your device for a native app experience.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-vprimary hover:bg-vsecondary">
                    <Download className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white text-gray-700 border-gray-300"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden lg:min-h-[300px] min-h-[200px]  rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 lg:order-last flex items-center justify-center">
                <div className="text-center space-y-4 ">
                  <Wifi className="h-16 w-16 mx-auto text-blue-600" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Offline Ready</h3>
                    <p className="text-gray-600">
                      Access lessons without internet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-language Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[500px_1fr] lg:gap-12 xl:grid-cols-[550px_1fr]">
              <div className="mx-auto aspect-video overflow-hidden lg:min-h-[300px] min-h-[200px] rounded-xl bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <div className="text-center space-y-4 ">
                  <Globe className="h-16 w-16 mx-auto text-green-600" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Global Access</h3>
                    <p className="text-gray-600">
                      Available in multiple languages
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">
                    <Globe className="w-4 h-4 mr-1" />
                    Internationalization
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Learn in Your Language
                  </h2>
                  <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Break down language barriers with our comprehensive
                    multi-language support. Switch between languages seamlessly
                    and learn in the language you're most comfortable with.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">English</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Spanish</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">French</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">German</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-vprimary text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 text-center">
              <div className="space-y-2">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold">10K+</h3>
                <p className="text-blue-100">Active Learners</p>
              </div>
              <div className="space-y-2">
                <BookOpen className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold">500+</h3>
                <p className="text-blue-100">Lessons Available</p>
              </div>
              <div className="space-y-2">
                <Award className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold">95%</h3>
                <p className="text-blue-100">Completion Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Start Learning?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of learners who are already advancing their
                  skills with our interactive platform.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="bg-vprimary hover:bg-vsecondary">
                  <Play className="mr-2 h-4 w-4" />
                  <Link href="/courses">Get Started</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-gray-700 border-gray-300"
                >
                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
