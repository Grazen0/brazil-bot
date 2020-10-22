const { Sequelize, DataTypes } = require('sequelize');

/**
 * @param {Sequelize} sequelize
 */
module.exports = sequelize => {
	return sequelize.define(
		'logs',
		{
			log_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			message: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			date: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};
