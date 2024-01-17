// models/Answer.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import User from './User';
import Question from './Question';

class Answer extends Model {
    public body!: string;
    public score!: number;
    public user_id!: number;
    public id!: number;
    public accepted!: boolean;
    public question_id!: number;

    // timestamps!
    public readonly creation!: Date;
}

Answer.init(
    {
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        creation: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        accepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'Answer',
        tableName: 'answers'
    }
);

Answer.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Answer, { foreignKey: 'user_id' });
Answer.belongsTo(Question, { foreignKey: 'question_id' });
Question.hasMany(Answer, { foreignKey: 'question_id' });

export default Answer;
