import { Client, GuildMember, TextChannel } from 'discord.js';
import config from '../config.json';

export default (client: Client, prevMember: GuildMember, member: GuildMember) => {
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
