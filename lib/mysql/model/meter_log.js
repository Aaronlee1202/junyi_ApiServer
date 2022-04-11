import pkg from 'sequelize'

const { Model, DataTypes } = pkg
import { sequelize } from '../connection.js'

export class meter_log extends Model {}
meter_log.init(
    {
        // Attributes定義
        meter_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        log_time: {
            type: DataTypes.TIME,
            allowNull: false,
            primaryKey: true,
        },
        log_date: {
            type: DataTypes.DATE,
            allowNull: false,
            primaryKey: true,
        },
        log_datetime: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        freq: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        v_a: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        v_b: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        v_c: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        v_ab: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        v_bc: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        v_ca: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        i_a: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        i_b: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        i_c: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        p_a: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        p_b: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        p_c: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        p_con: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        p_tot: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        pf_a: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        pf_b: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        pf_c: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        pf_tot: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        pf_avg: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        ep_imp: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        tot: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
    },
    {
        // Other model options go here
        sequelize, // 傳入Sequalize Instance，就是Connection建立連線後的Instance
        modelName: 'meter_log', // 定義ModelName
        timestamps: false,
    }
)
