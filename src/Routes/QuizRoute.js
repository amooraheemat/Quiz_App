import express from 'express';

import { getQuizPage, submitQuiz } from '../Controllers/QuizController.js';

const router = express.Router();

router.get('/quiz', getQuizPage);
router.post('/submit', submitQuiz);

export default router;