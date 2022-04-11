import pkg from 'sequelize'

const { Model, DataTypes } = pkg
import { sequelize } from '../connection.js'

export class campus_rec extends Model {}
campus_rec.init(
    {
        // Attributes定義
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        power: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        day_energy: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        sequelize, // 傳入Sequalize Instance，就是Connection建立連線後的Instance
        modelName: 'campus_rec', // 定義ModelName
    }
)
