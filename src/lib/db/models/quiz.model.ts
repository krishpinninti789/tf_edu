import mongoose, { type Document, Schema } from "mongoose";

export interface IQuizQuestion {
  id: number;
  type: "text" | "image";
  question: string;
  image?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface IQuiz extends Document {
  id: string;
  title: string;
  description: string;
  image: string;
  questions: IQuizQuestion[];
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuizQuestionSchema = new Schema<IQuizQuestion>({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["text", "image"],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: (v: string[]) => v.length >= 2 && v.length <= 6,
      message: "A question must have between 2 and 6 options",
    },
  },
  correctAnswer: {
    type: Number,
    required: true,
    validate: {
      validator: function (v: number) {
        return v >= 0 && v < this.options.length;
      },
      message: "Correct answer index must be valid for the given options",
    },
  },
  explanation: {
    type: String,
    required: true,
  },
});

const QuizSchema = new Schema<IQuiz>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    image: {
      type: String,
      required: true,
    },
    questions: {
      type: [QuizQuestionSchema],
      required: true,
      validate: {
        validator: (v: IQuizQuestion[]) => v.length > 0 && v.length <= 50,
        message: "A quiz must have between 1 and 50 questions",
      },
    },
    duration: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
QuizSchema.index({ category: 1 });
QuizSchema.index({ difficulty: 1 });
QuizSchema.index({ createdAt: -1 });

// Virtual for question count
QuizSchema.virtual("questionCount").get(function () {
  return this.questions.length;
});

// Ensure virtual fields are serialized
QuizSchema.set("toJSON", {
  virtuals: true,
});

const Quiz = mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", QuizSchema);

export default Quiz;
