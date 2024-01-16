// models/Answer.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import User from './User';
import Question from './Question';

class Answer extends Model {
    public body!: string;
    public creation!: Date;
    public score!: number;
    public userId!: number;
    public id!: number;
    public accepted!: boolean;
    public questionId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        accepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Answer',
    }
);

Answer.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Answer, { foreignKey: 'userId' });
Answer.belongsTo(Question, { foreignKey: 'questionId' });
Question.hasMany(Answer, { foreignKey: 'questionId' });

export default Answer;
