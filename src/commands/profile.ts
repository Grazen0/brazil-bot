import { MessageEmbed } from 'discord.js';
import config from '../../config.json';
import { asCurrency } from '../../util/utils';

const profile: Command = {
	name: 'profile',
	description: 'Shows your current profile',
	aliases: ['p'],
	usage: ['(@User)'],
	execute: async ({ author, message: { mentions }, channel }) => {
		const user = mentions.users.first() || author;
		if (user.bot) {
			channel.send('The mentioned user is a bot!');
			return;
		}

		const bal = await user.getBalance();

		channel.send(
      new MessageEmbed()
				.setTitle(`${user.username}'s profile`)
				.setDescription(`Balance: ${bal}`)
				.setColor(config.embedColor)
		);
	},
};

export default profile;
