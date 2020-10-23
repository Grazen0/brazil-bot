const { MessageEmbed } = require('discord.js');
const config = require('../../../../config.json');

module.exports = {
	name: 'gamble',
	description: 'Gamble for $500',
	execute: async ({ channel, author }) => {
		const bal = await author.getBalance();
		if (500 > bal) {
			channel.send("You don't have enough money lol");
			return;
		}
		//await author.add(-500);
		channel.send(
			new MessageEmbed()
				.setTitle('Gamble')
				.setColor(config.embedColor)
				.setDescription(`oof`)
		);
	},
};
