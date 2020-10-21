const { Sequelize, DataTypes } = require('sequelize');

/**
 * @param {Sequelize} sequelize
 */
module.exports = sequelize =>
	sequelize.define(
		'user_currency',
		{
			user_id: {
				type: DataTypes.STRING(18),
				primaryKey: true,
				allowNull: false,
			},
			balance: {
				type: DataTypes.BIGINT,
				allowNull: false,
				defaultValue: 0,
			},
			last_daily: {
				type: DataTypes.BIGINT,
				allowNull: false,
				defaultValue: 0,
			},
			last_weekly: {
				type: DataTypes.BIGINT,
				allowNull: false,
				defaultValue: 0,
			},
		},
		{
			timestamps: false,
			freezeTableName: true,
		}
	);
