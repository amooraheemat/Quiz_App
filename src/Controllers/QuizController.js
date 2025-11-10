import { Question, Option, Result } from "../Models/index.js";
import { sendQuizResultEmail } from "../Services/EmailService.js";

// Initialize models when controller is loaded
import "../Models/index.js";

// Show the Quiz Page
export const getQuizPage = async (req, res) => {
  try {
    console.log("Loading quiz page...");
    const questions = await Question.findAll({
      include: [{
        model: Option,
        attributes: ['id', 'label', 'text']
      }]
    });

    console.log("Questions loaded:", questions.length);
    console.log("First question:", questions[0]?.text);
    console.log("First question options:", questions[0]?.Options?.length);

    res.render("quiz", { quiz: questions });
  } catch (err) {
    console.error("Error loading Quiz:", err);
    res.status(500).send(`Server Error: ${err.message}`);
  }
};

// For Quiz Submission
export const submitQuiz = async (req, res) => {
  try {
    const userAnswers = req.body;
    const { name, email } = userAnswers;

    // Get all questions with their options
    const questions = await Question.findAll({
      include: [{
        model: Option,
        attributes: ['id', 'label', 'text', 'is_correct']
      }]
    });

    let score = 0;
    let summary = [];

    questions.forEach((question, index) => {
      const questionKey = `q${index + 1}`;
      const userAnswer = userAnswers[questionKey];

      // Find the correct answer
      const correctOption = question.Options.find(opt => opt.is_correct === 1);
      const correctAnswerLabel = correctOption ? correctOption.label : "";

      const isCorrect = userAnswer === correctAnswerLabel;

      if (isCorrect) score++;

      summary.push({
        question: question.text,
        yourAnswer: userAnswer,
        correctAnswer: correctAnswerLabel,
        result: isCorrect ? "Correct" : "Wrong",
      });
    });

    const quizTitle = "General Quiz";

    // Save Results in the Database
    await Result.create({
      name: name,
      email: email,
      score: score
    });

    // Send results via Email
    try {
      await sendQuizResultEmail(email, {
        userName: name,
        quizTitle,
        score,
        totalQuestions: questions.length,
        summary,
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }

    // Render Result Page
    res.render("result", { name, score, summary });

  } catch (err) {
    console.error("Error processing quiz submission:", err);
    res.status(500).send("Unable to process quiz submission.");
  }
};