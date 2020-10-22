const { Client, GuildMember, TextChannel } = require('discord.js');
const config = require('../../config.json');

/**
 * @param {Client} client
 * @param {GuildMember} prevMember
 * @param {GuildMember} member
 */
module.exports = (client, prevMember, member) => {
	const { brazilRole, brazilChannel } = config;
	const {
		guild,
		id,
		roles: { cache },
	} = member;

	// Check if member got brazil role
	const prevRole = prevMember.roles.cache.get(brazilRole);
	const newRole = cache.get(brazilRole);
	if (!prevRole && newRole) {
		// Get channel and send message
		const channel = guild.channels.cache.get(brazilChannel);
		if (!channel || !(channel instanceof TextChannel)) return;

		channel.send(`<@${id}>, welcome to Brazil!`);
	} else if (prevRole && !newRole) {
		member.user.send(
			'Your visit to Brazil has ended. We hope you come back soon!'
		);
	}
};
