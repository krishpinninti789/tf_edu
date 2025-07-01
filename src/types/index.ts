//Course types

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: string;
  videoUrl: string;
  description: string;
  completed: boolean;
  textContent: string;
}

export interface Part {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface ICourse extends Document {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  totalLessons: number;
  learners: string;
  rating: number;
  instructor: string;
  instructorBio: string;
  skills: string[];
  prerequisites: string;
  image: string;
  completedLessons: number;
  totalDuration: string;
  certificate: boolean;
  parts: Part[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: string;
  videoUrl: string;
  description: string;
  completed: boolean;
  textContent: string;
}

export interface Part {
  id: number;
  title: string;
  lessons: Lesson[];
}

export type CourseProps = {
  courses: Course[];
};

export interface Course {
  id: number;
  title: string;
  lessons: String;
  description: string;
  category: string;
  level: string;
  duration: string;
  totalLessons: number;
  learners: string;
  rating: number;
  instructor: string;
  instructorBio: string;
  skills: string[];
  prerequisites: string;
  image: string;
  completedLessons: number;
  totalDuration: string;
  certificate: boolean;
  parts: Part[];
  isRecommended?: boolean;
  progress: number;
}

export type SearchProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedLevel: string;
  onLevelChange: (value: string) => void;
};

//Quiz types

export interface IQuizzQuestion {
  id: number;
  type: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Interface for the quiz
export interface IQuizz extends Document {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  questions: IQuizzQuestion[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QuizProps {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  questions: IQuizzQuestion[];
  createdAt?: Date;
  updatedAt?: Date;
}
