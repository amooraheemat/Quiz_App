import sequelize from '../Config/Database.js';
import Question from './questionModel.js';
import Option from './optionModel.js';
import Result from './ResultModel.js';

Question.hasMany(Option, { foreignKey: 'question_id' });
Option.belongsTo(Question, { foreignKey: 'question_id' });

export { Question, Option, Result, sequelize };