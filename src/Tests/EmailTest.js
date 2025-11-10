import { sendQuizResultEmail } from '../Services/EmailService.js'; // correct relative path
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve('../../.env') });

const testEmail = async () => {
  try {
    await sendQuizResultEmail('youremail@example.com', {
      userName: 'Test User',
      quizTitle: 'Test Quiz',
      score: 10,
      totalQuestions: 10,
      summary: [
        { question: 'Sample Q1', yourAnswer: 'A', correctAnswer: 'A', isCorrect: true, result: 'Correct' },
        { question: 'Sample Q2', yourAnswer: 'B', correctAnswer: 'C', isCorrect: false, result: 'Wrong' }
      ]
    });
    console.log('Test email sent successfully!');
  } catch (err) {
    console.error('Failed to send test email:', err);
  }
};

testEmail();

// console.log(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.AUTH_EMAIL);


//  Test on http://localhost:3000/test-email
