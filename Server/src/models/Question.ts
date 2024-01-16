// models/Question.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import User from './User';

class Question extends Model {
    public id!: number;
    public body!: string;
    public userId!: number;
    public creation!: Date;
    public score!: number;
    public title!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Question.init(
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
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Question',
    }
);

Question.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Question, { foreignKey: 'userId' });

export default Question;
