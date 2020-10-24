import { MessageEmbed } from 'discord.js';
import config from '../../config.json';

const shop: Command = {
	name: 'shop',
	description: 'Shop for items',
	usage: ['(page)'],
	execute: async ({ client, channel }) => {
		channel.send(
			new MessageEmbed()
				.setTitle("Brazil Bot's shop")
				.setColor(config.embedColor)
				.setThumbnail(client.user?.displayAvatarURL({ dynamic: true, size: 1024 }) || '')
				.setDescription(
					`Buy a ticket **$${config.ticketPrice}** \`${config.prefix}ticket\`\nGamble **$500** \`${config.prefix}gamble\`\nNothing else right now`
				)
				.setFooter(`do ${config.prefix}shop (page number)`)
		);
	},
};

export default shop;
