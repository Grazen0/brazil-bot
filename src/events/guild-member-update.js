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
	if (!(!prevMember.roles.cache.get(brazilRole) && cache.get(brazilRole)))
		return;

	// Get channel and send message
	const channel = guild.channels.cache.get(brazilChannel);
	if (!channel || !(channel instanceof TextChannel)) return;

	channel.send(`<@${id}>, welcome to Brazil!`);
};
