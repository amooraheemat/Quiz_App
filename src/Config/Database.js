import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'quizApp_DB',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    dialect: process.env.DB_DIALECT,
    logging: false
  }
);

// Test connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL Database with Sequelize');
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

export default sequelize;