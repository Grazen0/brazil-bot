import config from '../../config.json';
import { asCurrency } from '../../util/utils';

const daily: Command = {
	name: 'daily',
	description: 'Claim your daily reward!',
	execute: async ({ channel, author, client }) => {
		const now = Date.now();
		const diff =
			now -
			(
				(await client.models.UserCurrency.findByPk(author.id)) || {
					last_daily: 0,
				}
			).last_daily;

		const DAY_MILLIS = 1000 * 60 * 60 * 24;
		if (diff < DAY_MILLIS) {
			const rest = DAY_MILLIS - diff;
			const hours = Math.floor(rest / 3600000);
			const minutes = Math.floor(rest / 60000) - hours * 60;

			channel.send(
				`You have to wait ${hours}h and ${minutes}m before claiming your reward!`
			);
			return;
		}

		const { dailyReward } = config;
		await author.add(dailyReward);
		await client.models.UserCurrency.upsert({
			user_id: author.id,
			last_daily: now,
		});

		channel.send(`You have received \`${asCurrency(dailyReward)}\`!`);
	},
};

export default daily;
