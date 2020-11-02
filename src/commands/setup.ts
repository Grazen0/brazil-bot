import { MessageEmbed } from 'discord.js';
import config from '../config.json';

const setup: Command = {
	name: 'setup',
	description: 'Setup bot in server',
	usage: ['setup'],
	execute: async ({ channel, message, args }) => {

const regexchannel = /^[0-9]{18}$|(?<=^<#)[0-9]{18}(?=>$)/;
const regexrole = /^[0-9]{18}$|(?<=^<@&)[0-9]{18}(?=>$)/;

const ids = (args.length && args[0] === regexchannel && args[1] === regexrole) ?  `Channel: ${args[0]} Role: ${args[1]}`: "You didn't mention something.";

		await channel.send(
			new MessageEmbed()
				.setTitle('Setup')
				.setDescription(ids)
				.setColor(config.embedColor)
		);
	},
};

export default setup;
