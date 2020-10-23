const { MessageEmbed } = require('discord.js');
const config = require('../../../../config.json');
const { asCurrency } = require('../../../util/utils');

module.exports = {
	name: 'number',
	description: 'Earn more money (doubles your gamble)',
  usage: '(number)',
	execute: async ({ channel, author, client, args }) => {
		const bal = await author.getBalance();
    const price = parseInt(args[0]);
    const reward = price*3;

    if (!args.length) {
  		return channel.send(`You didn't mention your bid`);
  	}

		if (bal < price) {
			channel.send(
				`You don't have enough money lol, you need ${asCurrency(gamblePrice)}`
			);
			return;
		}

		await author.add(-price);

    await channel.send(
			new MessageEmbed()
				.setTitle(`Guess a number between 1 and 10 to get a prize of ${reward}!`)
				.setColor(embedColor)
				//.setDescription();
        .setImage(
					'https://media1.tenor.com/images/467d353f7e2d43563ce13fddbb213709/tenor.gif?itemid=12136175'
				)
      );
	},
};
