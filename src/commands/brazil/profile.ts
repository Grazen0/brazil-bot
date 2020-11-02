import { MessageEmbed } from 'discord.js';
import config from '../../config.json';
import { asCurrency } from '../../util/utils';

const profile: Command = {
	name: 'profile',
	description: 'Shows your profile',
	aliases: ['p'],
	usage: ['(@User)'],
	execute: async ({ author, message: { mentions }, channel, client }) => {
		const user = mentions.users.first() || author;
		if (user.bot) {
			channel.send('The mentioned user is a bot!');
			return;
		}

		const bal = await user.getBalance();
		const time = (await client.models.UserTickets.findByPk(user.id))?.until;

		const embed = new MessageEmbed()
			.setTitle(`${user.tag}'s profile`)
			.setColor(config.embedColor)
			.addField('Balance:', asCurrency(bal), true);

		if (time) {
			const rest = time - Date.now();
			const hours = Math.floor(rest / (1000 * 60 * 60));
			const minutes = Math.floor(rest / (1000 * 60)) - hours * 60;

			embed.addField(
				'Time:',
				`${hours} hours and ${minutes} minutes left.`,
				true
			);
		} else {
			embed.addField('Time:', '(No tickets to Brazil lmao)', true);
		}

		channel.send(embed);
	},
};

export default profile;
