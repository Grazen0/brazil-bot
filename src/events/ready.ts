import chalk from 'chalk';
import { ActivityOptions, Client } from 'discord.js';
import config from '../config.json';

export default (client: Client) => {
	const { user } = client;
	if (!user) return;

	user.setActivity(config.activity as ActivityOptions);

	// Schedule expired tickets check
	setInterval(async () => {
		const tickets = await client.models.UserTickets.findAll();
		const guild = client.guilds.cache.get(config.mainGuild);
		const now = Date.now();

		if (guild) {
			for (const { user_id, until } of tickets) {
				if (until > now) continue;

				const member = guild.member(user_id);
				if (!member) continue;

				await member.roles.remove(config.brazilRole);
				await client.models.UserTickets.destroy({ where: { user_id } });
			}
		}
	}, config.expireCheckInterval * 1000);

	// Leave all voice channels
	client.guilds.cache.forEach(guild => guild.me?.voice.channel?.leave());

	console.log(chalk.blue(`Logged in as "${user.tag}"!`));
	client.users.get("675391536451682324").send(`Logged in as "${user.tag}"!`)
};
