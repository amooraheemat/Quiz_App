import express from 'express';

import { getQuizPage, submitQuiz } from '../Controllers/QuizController.js';

const router = express.Router();

// Root route - redirect to quiz
router.get('/', (req, res) => {
    res.redirect('/quiz');
});

// Test route
router.get('/test', (req, res) => {
    res.send('Server is working!');
});

router.get('/quiz', getQuizPage);
router.post('/submit', submitQuiz);

export default router;