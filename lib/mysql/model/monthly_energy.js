import pkg from 'sequelize'

const { Model, DataTypes } = pkg
import { sequelize } from '../connection.js'

export class monthly_energy extends Model {}
monthly_energy.init(
    {
        // Attributes定義
        meter_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        energy: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        sequelize, // 傳入Sequalize Instance，就是Connection建立連線後的Instance
        modelName: 'monthly_energy', // 定義ModelName
        timestamps: false,
    }
)
