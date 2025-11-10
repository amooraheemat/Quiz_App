import { DataTypes } from 'sequelize';
import sequelize from '../Config/Database.js';

const Option = sequelize.define('Option', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    label: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    text: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    is_correct: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0
    }
}, {
    tableName: 'options',
    timestamps: false
});

export default Option;