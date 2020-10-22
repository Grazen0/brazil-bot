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
	client.guilds.cache.forEach(
		({
			me: {
				voice: { channel },
			},
		}) => channel && channel.leave()
	);

	console.log(chalk.blue(`Logged in as ${user.tag}!`));
};
