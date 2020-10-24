import { MessageEmbed } from 'discord.js';
import config from '../config.json';

const rickRoll: Command = {
	name: 'no',
	description: 'no',
	usage: ["no"],
	execute: async ({ channel, client, author }) => {
		await channel.send(
			new MessageEmbed()
				.setTitle('NO')
				.setImage(
					'https://media1.tenor.com/images/467d353f7e2d43563ce13fddbb213709/tenor.gif?itemid=12136175'
				)
				.setColor(config.embedColor)
		);

		client.log(`${author.tag} got rickrolled.`);
	},
};

export default no;
