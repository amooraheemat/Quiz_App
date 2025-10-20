const express = require('express');
const router = express.Router();
const quizController = require('../Controllers/QuizController.js');

router.get('/quiz', quizController.getQuizPage);
router.post('/submit', quizController.submitQuiz);

module.exports = router;