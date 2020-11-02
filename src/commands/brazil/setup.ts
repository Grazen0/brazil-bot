import { MessageEmbed } from 'discord.js';
import config from '../../config.json';

const setup: Command = {
	name: 'setup',
	description: 'Setup bot in server',
	usage: ['setup'],
	execute: async ({ channel, args }) => {
		const channelRegex = /^[0-9]{18}$|(?<=^<#)[0-9]{18}(?=>$)/;
		const roleRegex = /^[0-9]{18}$|(?<=^<@&)[0-9]{18}(?=>$)/;

		const channelId = channelRegex.exec(args[0]);
		const roleId = roleRegex.exec(args[1]);

		if (!channel || !roleId) {
			channel.send('You must mention a channel and a role!');
			return;
		}

		await channel.send(
			new MessageEmbed()
				.setTitle('Setup')
				.setDescription(`Selected: <#${channelId}>, <@&${roleId}>`)
				.setColor(config.embedColor)
		);
	},
};

export default setup;
