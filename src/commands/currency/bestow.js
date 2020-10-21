const config = require('../../../config.json');
const { asCurrency } = require('../../util/utils');

module.exports = {
	name: 'bestow',
	description: '...',
	execute: async ({ author, channel, mentions, args, message }) => {
		if (!config.owners.includes(author.id)) {
			channel.send("You don't have permission for this!");
			return;
		}

		const reward = parseInt(args[0]);
		const member = message.mentions.users.first();

    if(isNaN(reward)) {
      channel.send("Please add a valid number");
    }

		if (!member) {
			channel.send('pls mention a user');
			return;
		}

		await member.add(reward);
		channel.send(`${member} received \`${asCurrency(reward)}\``);
	},
};
