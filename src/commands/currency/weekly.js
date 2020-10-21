const config = require('../../../config.json');
const { asCurrency } = require('../../util/utils');

module.exports = {
	name: 'weekly',
	description: 'Claim your weekly reward!',
	execute: async ({ channel, author, client }) => {
		const now = Date.now();
		const diff =
			now -
			(
				(await client.models.UserCurrency.findByPk(author.id)) || {
					last_weekly: 0,
				}
			).last_weekly;

		const WEEK_MILLIS = 1000 * 60 * 60 * 24 * 7;
		if (diff < WEEK_MILLIS) {
			const rest = WEEK_MILLIS - diff;
			const days = Math.floor(rest / (1000 * 60 * 60 * 24));
			const hours = Math.floor(rest / (1000 * 60 * 60)) - days * 24;
			const minutes =
				Math.floor(rest / (1000 * 60)) - hours * 60 - days * 24 * 60;

			channel.send(
				`You have to wait ${days} days, ${hours} hours and ${minutes} minutes before claiming your reward!`
			);
			return;
		}

		const { weeklyReward } = config;
		await author.add(weeklyReward);
		await client.models.UserCurrency.upsert({
			user_id: author.id,
			last_weekly: now,
		});

		channel.send(`You have received \`${asCurrency(weeklyReward)}\`!`);
	},
};
