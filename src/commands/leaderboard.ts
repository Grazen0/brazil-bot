import { MessageEmbed } from 'discord.js';
import config from '../config.json';
import { asCurrency } from '../util/utils';
import balance from './currency/balance';

const leaderBoard: Command = {
	name: 'leaderboard',
	description: 'Bot Leaderboard',
	execute: async ({ channel, client }) => {
		const rows = await client.models.UserCurrency.findAll();
		rows.sort((a, b) => b.balance - a.balance);

		const lines = rows
			.map(row => ({ balance: row.balance, user: client.users.cache.get(row.user_id) }))
			.filter(({ user }) => user && !user.bot)
			.map(({ user, balance }, index) => `${index + 1}. ${user?.tag} - ${asCurrency(balance)}`);

		channel.send(
			new MessageEmbed()
				.setTitle('Balance leaderboard')
				.setColor(config.embedColor)
				.setDescription(`\`\`\`${lines.join('\n')}\`\`\``)
		);
	},
};

export default leaderBoard;
