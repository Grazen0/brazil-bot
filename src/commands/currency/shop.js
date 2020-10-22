const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'Shop',
	description: "Shop for items",
	usage: ['(page)'],
	execute: async ({ message, args }) => {
    channel.send(
      new MessageEmbed()
        .setTitle("Brazil Bot's shop")
        .setColor(config.embedColor)
        .setDescription('Item shop is empty')
        .setFooter(`do ${config.prefix}shop (page number)`)
    );

    channel.send(embed);
	},
};
