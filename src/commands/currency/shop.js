const { MessageEmbed } = require('discord.js');
const config = require('../../../config.json');

module.exports = {
	name: 'Shop',
	description: "Shop for items",
	usage: ['(page)'],
	execute: async ({  client, channel, message, args }) => {
    channel.send(
      new MessageEmbed()
        .setTitle("Brazil Bot's shop")
        .setColor(config.embedColor)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true}))
        .setDescription(`Buy a ticket **$${config.ticketPrice}** \`${config.prefix}ticket\``)
        .setFooter(`do ${config.prefix}shop (page number)`)
    );
	},
};
