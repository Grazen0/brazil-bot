import { MessageEmbed } from 'discord.js';
import config from '../config.json';

const rickRoll: Command = {
	name: 'rule34',
	description: '...',
	usage: ['(tag1)', '(tag2)', '...'],
	execute: async ({ channel, client, author }) => {
		await channel.send(
			new MessageEmbed()
				.setTitle('SIKE')
				.setImage(
					'https://media1.tenor.com/images/467d353f7e2d43563ce13fddbb213709/tenor.gif?itemid=12136175'
				)
				.setColor(config.embedColor)
		);

		client.log(`${author.tag} got rickrolled.`);
	},
};

export default rickRoll;
