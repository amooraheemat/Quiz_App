
# Quiz App Project

A simple web-based quiz application built with Node.js, Express, and EJS templating engine. Users can take programming and technology quizzes and view their results.

## Features

- Interactive quiz interface with multiple-choice questions
- Real-time score calculation
- User registration with name and email
- Results display with detailed answer breakdown
- Database integration with MySQL/Sequelize
- Email service integration
- Responsive web design

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL with Sequelize ORM
- **Template Engine**: EJS
- **Email Service**: Nodemailer
- **Environment**: dotenv for configuration
- **Development**: Nodemon for auto-restart

## Project Structure

```
quiz_app_project/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   └── quizController.js  # Quiz logic and database operations
├── models/
│   ├── User.js           # User model
│   ├── questions.js      # Questions model
│   └── quizResult.js     # Quiz results model
├── routes/
│   └── quiz.js           # Quiz routes and endpoints
├── services/
│   └── emailService.js   # Email functionality
├── views/
│   ├── quiz.ejs          # Quiz interface
│   ├── results.ejs       # Results display
│   ├── result.ejs        # Individual result view
│   └── error.ejs         # Error page
├── .env                  # Environment variables
├── index.js              # Main application entry point
└── package.json          # Dependencies and scripts
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quiz_app_project
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```env
PORT=3000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=quiz_app_db
EMAIL_HOST=your_email_host
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

4. Set up the database:
- Create a MySQL database
- Update the database configuration in `config/db.js`
- Run the application to auto-create tables

## Usage

1. Start the development server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

3. Take the quiz:
   - Enter your name and email
   - Answer the multiple-choice questions
   - Submit to view your results

## Quiz Content

The app includes 10 programming and technology questions covering:
- JavaScript fundamentals
- Node.js concepts
- Git commands
- HTML basics
- Web development concepts

## API Endpoints

- `GET /` - Display the quiz interface
- `POST /submit` - Submit quiz answers and get results

## Development

The application uses:
- **Nodemon** for automatic server restart during development
- **Sequelize** for database operations and migrations
- **EJS** for server-side rendering
- **Express middleware** for request handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request



## Author

Quiz App Project Team
Raheemat
Wilx
Adededayo
Abduwaasil
Debby