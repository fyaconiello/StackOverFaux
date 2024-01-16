// models/Comment.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import User from './User';
import Answer from './Answer';
import Question from './Question';

class Comment extends Model {
    public id!: number;
    public body!: string;
    public userId!: number;
    public answerId!: number;
    public questionId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
        answerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Comment',
    }
);

Comment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(Answer, { foreignKey: 'answerId' });
Answer.hasMany(Comment, { foreignKey: 'answerId' });
Comment.belongsTo(Question, { foreignKey: 'questionId' });
Question.hasMany(Comment, { foreignKey: 'questionId' });

export default Comment;
