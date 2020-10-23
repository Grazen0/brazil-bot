const { MessageEmbed, MessageCollector } = require('discord.js');
const config = require('../../../../config.json');
const { asCurrency } = require('../../../util/utils');

module.exports = {
	name: 'number',
	description: 'Earn more money (doubles your gamble)',
  usage: '(number)',
	execute: async ({ channel, author, client, args, message }) => {
		const bal = await author.getBalance();
    const price = parseInt(args[0]);
    const reward = price*3;
    const answer = Math.floor(Math.random() * 11);
    const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id);

    if (!args.length) {
  		return channel.send(`You didn't mention your bid`);
  	}

		if (bal < price) {
			channel.send(
				`You don't have enough money lol, you need ${asCurrency(price)}`
			);
			return;
		}

		await author.add(-price);

    await channel.send(
			new MessageEmbed()
				.setTitle(`Guess a number between 1 and 10 to get a prize of ${reward-price}!`)
				.setColor(config.embedColor)
				.setDescription(answer)
      );

      collector.on('collect', message => {
	       if (Number.isInteger(message.content)) {
           if (message.content === answer) {
             author.add(reward);
             channel.send(`Correct! You won ${reward-price}!`);
           } else {
             return channel.send('better luck next time.')
           }
         }
       });
	},
};
