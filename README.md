# Quiz App

A web-based quiz application built with Node.js, Express, and MySQL. Users can take a quiz, submit answers, and receive their scores via email.

## Features

- 30 multiple-choice questions loaded from MySQL database
- Real-time score calculation
- Results saved to database
- Email notification with quiz results
- Responsive web interface

## Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- EJS templating
- Nodemailer for email

## Prerequisites

- Node.js installed
- MySQL server running
- SMTP credentials for email service

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create database:
```bash
mysql -u root -p < DBschema.sql
```

4. Configure environment variables in `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=quizapp_db
DB_PORT=3306
DB_DIALECT=mysql
```

5. Configure email service in `src/Services/EmailService.js`

## Usage

Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

Visit `http://localhost:3000` to take the quiz.

## Project Structure

```
Quiz_App/
├── src/
│   ├── Config/         # Database configuration
│   ├── Models/         # Sequelize models
│   ├── Services/       # Email service
│   ├── Views/          # EJS templates
│   └── app.js          # Main application file
├── DBschema.sql        # Database schema and seed data
└── package.json
```

## Database Schema

- questions: Quiz questions
- options: Answer options for each question
- results: User quiz results
