const chalk = require('chalk');
const { Client } = require('discord.js');
const config = require('../../config.json');

/**
 * @param {Client} client
 */
module.exports = client => {
	const { user } = client;
	user.setActivity(config.activity);

	// Schedule expired tickets check
	setInterval(async () => {
		const tickets = await client.models.UserTickets.findAll();
		const now = Date.now();

		const guild = client.guilds.cache.get(config.mainGuild);
		if (guild) {
			for (const { user_id, until } of tickets) {
				if (until > now) continue;

				const member = guild.member(user_id);
				if (!member) continue;

				await member.roles.remove(config.brazilRole);
				await client.models.UserTickets.destroy({ where: { user_id } });

				const user = client.users.cache.get(user_id);
				if (user) {
					user.send(
						'Your visit to Brazil has ended. We hope you come back soon!'
					);
				}
			}
		}
	}, config.expireCheckInterval * 1000);

	console.log(chalk.blue(`Logged in as ${user.tag}!`));
};
