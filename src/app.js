import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "styles")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));

// Import models and controllers
import { Question, Option, Result } from "./Models/index.js";
import { sendQuizResultEmail } from "./Services/EmailService.js";

// Routes
app.get('/', (req, res) => {
  res.redirect('/quiz');
});

app.get('/quiz', async (req, res) => {
  try {
    const questions = await Question.findAll({
      include: [{
        model: Option,
        attributes: ['id', 'label', 'text']
      }]
    });
    res.render("quiz", { quiz: questions });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error loading quiz");
  }
});

app.post('/submit', async (req, res) => {
  try {
    const { name, email, ...answers } = req.body;

    const questions = await Question.findAll({
      include: [{
        model: Option,
        attributes: ['label', 'text', 'is_correct']
      }]
    });

    let score = 0;
    let summary = [];

    questions.forEach((question, index) => {
      const userAnswer = answers[`q${index + 1}`];
      const correctOption = question.Options.find(opt => opt.is_correct === 1);
      const isCorrect = userAnswer === correctOption?.label;

      if (isCorrect) score++;

      summary.push({
        question: question.text,
        yourAnswer: userAnswer,
        correctAnswer: correctOption?.label,
        result: isCorrect ? "Correct" : "Wrong"
      });
    });

    await Result.create({ 
      name, 
      email, 
      score,
      total_questions: questions.length,
      summary: JSON.stringify(summary)
    });

    try {
      await sendQuizResultEmail(email, {
        userName: name,
        quizTitle: "General Quiz",
        score,
        totalQuestions: questions.length,
        summary
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    res.render("result", { name, score, summary });
  } catch (err) {
    console.error("Submit error:", err);
    res.status(500).send("Error processing quiz");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});