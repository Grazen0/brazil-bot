import { MessageEmbed } from 'discord.js';
import config from '../config.json';

const todo: Command = {
	name: 'todo',
	description: 'To do list for Bot Devs',
	execute: async ({ channel, author }) => {

		channel.send(
			new MessageEmbed()
				.setTitle(`We have to finish:`)
				.setDescription(`The setup command.`)
				.setColor(config.embedColor)
		);
	},
};

export default todo;
