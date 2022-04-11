import pkg from 'sequelize'

const { Model, DataTypes } = pkg
import { sequelize } from '../connection.js'

export class daily_energy extends Model {}
daily_energy.init(
    {
        // Attributes定義
        meter_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        log_date: {
            type: DataTypes.DATE,
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
        modelName: 'daily_energy', // 定義ModelName
        timestamps: false,
    }
)
