import { MessageEmbed } from 'discord.js';
import config from '../config.json';
import { asCurrency } from '../util/utils';

const profile: Command = {
	name: 'profile',
	description: 'Shows your profile',
	aliases: ['p'],
	usage: ['(@User)'],
	execute: async ({ author, message: { mentions }, channel, client }) => {
		const user = mentions.users.first() || author;
		const userid = mentions.users.first().id || author;
		if (user.bot) {
			channel.send('The mentioned user is a bot!');
			return;
		}

		const bal = await user.getBalance();
		const result = await client.models.UserTickets.findByPk(userid);

		const rest = result.until - Date.now();
		const hours = Math.floor(rest / 3600000);
		const minutes = Math.floor(rest / 60000) - hours * 60;

if (!result) {
		channel.send(
      new MessageEmbed()
				.setTitle(`${user.username}'s profile`)
				.setDescription(`Balance: ${asCurrency(bal)}\nTime: ${user.username} doesn't have a ticket to Brazil lmao`)
				.setColor(config.embedColor)
		);
	} else {
		channel.send(
      new MessageEmbed()
				.setTitle(`${user.username}'s profile`)
				.setDescription(`Balance: ${asCurrency(bal)}\nTime: ${user.username} has ${hours} hours and ${minutes} minutes left in Brazil`)
				.setColor(config.embedColor)
		);
	}
	},
};

export default profile;
