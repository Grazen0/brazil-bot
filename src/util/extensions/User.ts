import { User } from 'discord.js';

export default ({ UserCurrency }: Models) => {
	User.prototype.getBalance = async function () {
		return ((await UserCurrency.findByPk(this.id)) || { balance: 0 }).balance;
	};

	User.prototype.add = async function (amount = 0) {
		let bal = await this.getBalance();
		bal = Math.max(bal + amount, 0);

		await UserCurrency.upsert({
			user_id: this.id,
			balance: bal,
		});

		return bal;
	};
};
