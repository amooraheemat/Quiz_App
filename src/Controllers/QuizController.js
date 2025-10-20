const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const quizFilePath = path.join(__dirname, '../quiz.json');


exports.getQuizPage = (req, res) => {
  fs.readFile(quizFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error loading quiz.');
    const quiz = JSON.parse(data);
    res.render('quiz', { quiz });
  });
};


exports.submitQuiz = (req, res) => {
  fs.readFile(quizFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading quiz data.');

    const quiz = JSON.parse(data);
    const userAnswers = req.body;
    let score = 0;
    let summary = [];

    quiz.forEach((q, index) => {
      const questionKey = `q${index + 1}`;
      const userAnswer = userAnswers[questionKey];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) score++;

      summary.push({
        question: q.question,
        yourAnswer: userAnswer,
        correctAnswer: q.correctAnswer,
        result: isCorrect ? 'Correct' : 'Wrong'
      });
    });


    const { name, email } = userAnswers;

    const sql = 'INSERT INTO results (name, email, score) VALUES (?, ?, ?)';
    db.query(sql, [name, email, score], (err, result) => {
      if (err) console.error('Error saving to DB:', err);
      res.render('result', { name, score, summary });
    });
  });
};