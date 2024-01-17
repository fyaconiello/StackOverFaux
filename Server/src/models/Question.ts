// models/Question.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import User from './User';

class Question extends Model {
    public id!: number;
    public body!: string;
    public user_id!: number;
    public score!: number;
    public title!: string;

    // timestamps!
    public readonly creation!: Date;
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
        user_id: {
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
        timestamps: false,
        modelName: 'Question',
        tableName: 'questions',
    }
);

Question.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Question, { foreignKey: 'user_id' });

export default Question;
