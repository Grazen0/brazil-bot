import { MessageEmbed } from 'discord.js';
import config from '../config.json';

const setup: Command = {
	name: 'setup',
	description: 'Setup bot in server',
	usage: ['setup'],
	execute: async ({ channel, message, args }) => {

const ids = (args.length && args[0] === 'oof' && args[1] === 'oof') ?  `Channel: ${args[0]} Role: ${args[1]}`: "You didn't mention anything.";

		await channel.send(
			new MessageEmbed()
				.setTitle('Setup')
				.setDescription(ids)
				.setColor(config.embedColor)
		);
	},
};

export default setup;
