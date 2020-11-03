import { MessageEmbed } from 'discord.js';
import config from '../config.json';

const todo: Command = {
	name: 'todo',
	description: 'To do list for Bot Devs',
	execute: async ({ channel, author }) => {

		channel.send(
			new MessageEmbed()
				.setTitle(`To do...`)
				.setDescription(`We have to finish\nThe setup command.\nNothing else so far maybe...`)
				.setColor(config.embedColor)
		);
	},
};

export default todo;
