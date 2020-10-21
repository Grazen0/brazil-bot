const config = require('../../../config.json');
const { asCurrency } = require('../../util/utils');

module.exports = {
	name: 'bestow',
	description: '...',
	execute: async ({ author, channel,  mentions, args, message }) => {
    if (author.id == '675391536451682324' || author.id == '537486856384675852') {
		const reward = parseInt(args[0]);
    const member = message.mentions.users.first();

    if (!member) {
      channel.send("pls mention a user")
    }

		await member.add(reward);
		channel.send(
			`${member} received \`${asCurrency(reward)}\``
		);
  }
	},
};
