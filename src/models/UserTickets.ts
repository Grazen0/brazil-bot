import { Sequelize, DataTypes, Model } from 'sequelize';

class UserTickets extends Model {
	user_id!: string;
	until!: number;
}

export default (sequelize: Sequelize) => {
	UserTickets.init(
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
			tableName: 'user_tickets',
			sequelize,
		}
	);
	return UserTickets;
};
