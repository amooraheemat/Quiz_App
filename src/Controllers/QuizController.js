import db from '../Config/Database.js';
import { sendQuizResultEmail } from '../Services/EmailService.js';

// Show the Quiz Page
export const getQuizPage = (req, res) => {
 const sql = 'SELECT * FROM questions';

 db.query(sql, (err, results) => {
  if (err) {
    console.error('Error loading Quiz:', err);
    return res.status(500).send('Server Error: Error loading quiz')
  }

  res.render('quiz', {quiz: results });
 });
};

// For Quiz Submission
export const submitQuiz = (req, res) => {
  const userAnswers = req.body;
  const { name, email } = userAnswers;

  const sql = 'SELECT * FROM questions';

  db.query(sql, async (err, quiz) => {
    if (err) {
      console.error('Error reading quiz data:', err);
      return res.status(500).send('Error reading quiz data.');
    }

    let score = 0;
    let summary = [];

    quiz.forEach((q, index) => {
      const questionKey = `q${index + 1}`;
      const userAnswer = userAnswers[questionKey];
      const isCorrect = userAnswer === q.correct_answer;

      if (isCorrect) score++;

      summary.push({
        question: q.question_text,
        yourAnswer: userAnswer,
        correctAnswer: q.correct_answer,
        result: isCorrect ? 'Correct' : 'Wrong'
      });
    });

    const quizTitle = 'General Quiz';

    // Saves Results in the Database
    const insertSql = 'INSERT INTO results (name, email, score) VALUES (?, ?, ?)';
    db.query(insertSql, [name, email, score], async (err) => {
      if (err) {
        console.error('Error saving to DB:', err);
        return res.status(500).send('Unable to save result.');
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
        console.error('Error sending email:', error);
      }

      // Render Result Page 
      res.render('result', { name, score, summary });
    });
  });
};