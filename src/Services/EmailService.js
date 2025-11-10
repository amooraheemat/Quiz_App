import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS
  },
  requireTLS: true,
  tls: {
    rejectUnauthorized: false
  }
});

export const sendQuizResultEmail = async (recipient, details) => {
  const { userName, quizTitle, score, totalQuestions, summary } = details;

  // Plain text fallback
  const plainSummary = summary
    .map(
      (item, index) =>
        `${index + 1}. ${item.question}\n   Your Answer: ${item.yourAnswer}\n   Correct Answer: ${item.correctAnswer}\n   Status: ${item.isCorrect ? 'Correct' : 'Wrong'}`
    )
    .join('\n\n');

  const textBody = `
Hello ${userName},

Your quiz has been submitted successfully! 

Quiz Title: ${quizTitle}
Score: ${score} / ${totalQuestions}

Here’s a summary of your answers:
${plainSummary}

Keep learning, keep improving. Great job!

Best regards,  
Quiz App Team
  `.trim();

  // HTML version 
  const htmlSummary = summary
    .map(
      (item, index) => `
      <tr style="background-color:${item.isCorrect ? '#d4edda' : '#f8d7da'}; color:${item.isCorrect ? '#155724' : '#721c24'};">
        <td style="padding:10px; border:1px solid #dee2e6;">${index + 1}</td>
        <td style="padding:10px; border:1px solid #dee2e6;">${item.question}</td>
        <td style="padding:10px; border:1px solid #dee2e6;">${item.yourAnswer || 'Not answered'}</td>
        <td style="padding:10px; border:1px solid #dee2e6;">${item.correctAnswer}</td>
        <td style="padding:10px; border:1px solid #dee2e6;">${item.isCorrect ? 'Correct' : 'Wrong'}</td>
      </tr>`
    )
    .join('');

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color:#f9f9f9; padding:20px; border-radius:10px;">
      <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
        <div style="background-color:#4A90E2; color:white; padding:15px 20px;">
          <h2 style="margin:0;">Quiz App Results</h2>
        </div>
        <div style="padding:20px;">
          <p>Hello <strong>${userName}</strong>,</p>
          <p>Your quiz has been submitted successfully!</p>
          <p><strong>Quiz Title:</strong> ${quizTitle}<br>
             <strong>Score:</strong> ${score} / ${totalQuestions}</p>

          <h3 style="margin-top:20px;">Summary of Your Answers</h3>

          <table style="width:100%; border-collapse: collapse; margin-top:10px;">
            <thead>
              <tr style="background-color:#343a40; color:#fff;">
                <th style="padding:10px; border:1px solid #dee2e6;">#</th>
                <th style="padding:10px; border:1px solid #dee2e6;">Question</th>
                <th style="padding:10px; border:1px solid #dee2e6;">Your Answer</th>
                <th style="padding:10px; border:1px solid #dee2e6;">Correct Answer</th>
                <th style="padding:10px; border:1px solid #dee2e6;">Result</th>
              </tr>
            </thead>
            <tbody>${htmlSummary}</tbody>
          </table>

          <p style="margin-top:20px;">Keep learning, keep improving. Great job!</p>
          <p>Best regards,<br><strong>Quiz App Team</strong></p>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: recipient,
    subject: `Your ${quizTitle} Quiz Results`,
    text: textBody,
    html: htmlBody
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Quiz result email sent to ${recipient}`);
    console.log(`Message ID: ${info.messageId}`);
  } catch (error) {
    console.error('Unable to send quiz result email:', error.message);
  }
};
