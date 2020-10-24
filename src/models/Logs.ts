import { Sequelize, DataTypes, Model } from 'sequelize';

class Logs extends Model {
	log_id!: string;
	message!: string;
	date!: number;
}

export default (sequelize: Sequelize) => {
	Logs.init({
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
	}, {
		tableName: 'logs',
		timestamps: false,
		sequelize
	});
	return Logs;
};
