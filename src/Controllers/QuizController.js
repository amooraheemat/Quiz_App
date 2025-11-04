import db from "../Config/Database.js";
import { sendQuizResultEmail } from "../Services/EmailService.js";

// Show the Quiz Page
export const getQuizPage = (req, res) => {
  const sql = "SELECT * FROM questions";

  db.query(sql, (err, questions) => {
    if (err) {
      console.error("Error loading Quiz:", err);
      return res.status(500).send("Server Error: Error loading quiz");
    }

    // Get options for all questions
    const optionsSql = "SELECT * FROM options";
    db.query(optionsSql, (err, options) => {
      if (err) {
        console.error("Error loading options:", err);
        return res.status(500).send("Server Error: Error loading options");
      }

      // Attach options to each question
      for (let i = 0; i < questions.length; i++) {
        const questionOptions = [];
        for (let j = 0; j < options.length; j++) {
          if (options[j].question_id === questions[i].id) {
            questionOptions.push(options[j]);
          }
        }
        questions[i].options = questionOptions;
      }

      res.render("quiz", { quiz: questions });
    });
  });
};

// For Quiz Submission
export const submitQuiz = (req, res) => {
  const userAnswers = req.body;
  const { name, email } = userAnswers;

  const sql = "SELECT * FROM questions";

  db.query(sql, async (err, quiz) => {
    if (err) {
      console.error("Error reading quiz data:", err);
      return res.status(500).send("Error reading quiz data.");
    }

    // Get options for all questions
    const optionsSql = "SELECT * FROM options";
    db.query(optionsSql, async (err, options) => {
      if (err) {
        console.error("Error reading options:", err);
        return res.status(500).send("Error reading options.");
      }

      let score = 0;
      let summary = [];

      quiz.forEach((q, index) => {
        const questionKey = `q${index + 1}`;
        const userAnswer = userAnswers[questionKey];

        // Find options for this question
        const questionOptions = options.filter(
          (opt) => opt.question_id === q.id
        );

        // Find the correct answer
        const correctOption = questionOptions.find(
          (opt) => opt.is_correct === 1
        );
        const correctAnswerLabel = correctOption ? correctOption.label : "";

        const isCorrect = userAnswer === correctAnswerLabel;

        if (isCorrect) score++;

        summary.push({
          question: q.text,
          yourAnswer: userAnswer,
          correctAnswer: correctAnswerLabel,
          result: isCorrect ? "Correct" : "Wrong",
        });
      });

      const quizTitle = "General Quiz";

      // Saves Results in the Database
      const insertSql =
        "INSERT INTO results (name, email, score) VALUES (?, ?, ?)";
      db.query(insertSql, [name, email, score], async (err) => {
        if (err) {
          console.error("Error saving to DB:", err);
          return res.status(500).send("Unable to save result.");
        }

        // Sends results via Email
        try {
          await sendQuizResultEmail(email, {
            userName: name,
            quizTitle,
            score,
            totalQuestions: quiz.length,
            summary,
          });
        } catch (error) {
          console.error("Error sending email:", error);
        }

        // Render Result Page
        res.render("result", { name, score, summary });
      });
    });
  });
};
