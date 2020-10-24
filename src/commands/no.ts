import { MessageEmbed } from 'discord.js';
import config from '../config.json';

const no: Command = {
	name: 'no',
	description: 'no',
	usage: ["no"],
	execute: async ({ channel, client, author }) => {
		await channel.send(
			new MessageEmbed()
				.setTitle('NO')
				.setDescription(
					'NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO'
				)
				.setColor(config.embedColor)
		);

	},
};

export default no;
