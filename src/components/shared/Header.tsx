import { BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div>
      <header className="px-4 py-10 lg:px-6 lg:py-15 h-16 flex items-center border-b">
        <Link className="flex p-4 items-center justify-center" href="/">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-vprimary" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">EduLearn</h1>
              <p className="text-sm text-gray-600">
                Education from the Ground Up
              </p>
            </div>
          </div>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/"
          >
            Dashboard
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/courses"
          >
            Lessons
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/quizes"
          >
            Quizes
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;
