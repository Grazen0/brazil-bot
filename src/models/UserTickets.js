const { Sequelize, DataTypes } = require('sequelize');

/**
 * @param {Sequelize} sequelize
 */
module.exports = sequelize =>
	sequelize.define(
		'user_tickets',
		{
			user_id: {
				type: DataTypes.STRING(18),
				allowNull: false,
				primaryKey: true,
			},
			until: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
