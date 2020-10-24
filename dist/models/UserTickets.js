"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class UserTickets extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    UserTickets.init({
        user_id: {
            type: sequelize_1.DataTypes.STRING(18),
            allowNull: false,
            primaryKey: true,
        },
        until: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 'user_tickets',
        sequelize
    });
    return UserTickets;
};
