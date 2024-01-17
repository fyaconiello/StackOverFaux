import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

class User extends Model {
    public id!: number;
    public name!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'User',
        tableName: 'users'
    }
);

export default User;