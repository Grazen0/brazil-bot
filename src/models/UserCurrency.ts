import { Sequelize, DataTypes, Model } from 'sequelize';

class UserCurrency extends Model {
	user_id!: string;
	balance!: number;
	last_daily!: number;
	last_weekly!: number;
}

export default (sequelize: Sequelize) => {
	UserCurrency.init(
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
			tableName: 'user_currency',
			timestamps: false,
			sequelize,
		}
	);
	return UserCurrency;
};
