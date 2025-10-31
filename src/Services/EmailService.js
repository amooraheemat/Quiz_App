import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Create a transporter using Gmail SMTP
 */

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,   // True for 465, false for other ports
    auth: {
        user: process.env.AUTH_EMAIL,    // Sender's email address
        pass: process.env.AUTH_PASS      // App password from gmail account
    },
    tls: {
        rejectUnauthorized: false
    }
});

/**
 * Sends quiz results through email in plain text
 * @param {string} recipient - User's email
 * @param {object} details - quiz details: {userName, QuizTitle, score, totalQuestions, summary}
 */


export const sendQuizResultEmail = async (recipient, details) => {
  const { userName, quizTitle, score, totalQuestions, summary } = details;

  // Format answer summary as plain text
  const summaryText = summary
    .map((item, index) => 
      `${index + 1}. ${item.question}\n   Your Answer: ${item.userAnswer}\n   Correct Answer: ${item.correctAnswer}\n   Status: ${item.isCorrect ? '✅ Correct' : '❌ Incorrect'}\n`
    )
    .join('\n');

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: recipient,
    subject: `Your ${quizTitle} Quiz Results`,
    text: `
Hello ${userName},

Your quiz has been submitted successfully! 

Quiz Title: ${quizTitle}
Score: ${score} / ${totalQuestions}

Here's a summary of your answers:

${summaryText}

Keep learning, keep improving. Great job!

Best regards,
Quiz App Team
    `.trim()
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Quiz result email sent to ${recipient}`);
  } catch (error) {
    console.error('Unable to send quiz result email:', error.message);
  }
};

