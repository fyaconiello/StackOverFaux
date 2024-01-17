// models/Comment.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import User from './User';
import Answer from './Answer';
import Question from './Question';

class Comment extends Model {
    public id!: number;
    public body!: string;
    public user_id!: number;
    public answer_id!: number;
    public question_id!: number;
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        answer_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'Comment',
        tableName: 'comments'
    }
);

Comment.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(Answer, { foreignKey: 'answer_id' });
Answer.hasMany(Comment, { foreignKey: 'answer_id' });
Comment.belongsTo(Question, { foreignKey: 'question_id' });
Question.hasMany(Comment, { foreignKey: 'question_id' });

export default Comment;
