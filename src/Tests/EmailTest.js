import { sendQuizResultEmail } from './Services/EmailService.js';

app.get('/test-email', async (req, res) => {
  try {
    await sendQuizResultEmail('youremail@example.com', {
      userName: 'Test User',
      quizTitle: 'Test Quiz',
      score: 10,
      totalQuestions: 10,
      summary: []
    });
    res.send('Test email sent successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send test email.');
  }
});

//  Test on http://localhost:3000/test-email
