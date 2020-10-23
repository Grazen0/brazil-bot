const { MessageEmbed } = require('discord.js');

const config = require('../../config.json');

module.exports = {
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
