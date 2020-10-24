"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Logs extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    Logs.init({
        log_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        message: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        date: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
        },
    }, {
        tableName: 'logs',
        timestamps: false,
        sequelize
    });
    return Logs;
};
