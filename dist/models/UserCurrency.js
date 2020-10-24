"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class UserCurrency extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    UserCurrency.init({
        user_id: {
            type: sequelize_1.DataTypes.STRING(18),
            primaryKey: true,
            allowNull: false,
        },
        balance: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
        },
        last_daily: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
        },
        last_weekly: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        tableName: 'user_currency',
        timestamps: false,
        sequelize
    });
    return UserCurrency;
};
