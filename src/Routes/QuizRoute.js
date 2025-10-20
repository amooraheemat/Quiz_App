const express = require('express');
const router = express.Router();
const quizController = require('../Controllers/quizController');

router.get('/quiz', quizController.getQuizPage);
router.post('/submit', quizController.submitQuiz);

module.exports = router;