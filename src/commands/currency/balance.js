const { asCurrency } = require('../../util/utils');

module.exports = {
	name: 'balance',
	description: 'Shows your current balance.',
	aliases: ['bal'],
	usage: ['(@User)'],
	execute: async ({ author, message: { mentions }, channel }) => {
		const user = mentions.users.first() || author;
		if (user.bot) {
			channel.send('The mentioned user is a bot!');
			return;
		}

		const bal = await user.getBalance();

		channel.send(
			`${
				user.id === author.id ? 'Your' : `\`${user.tag}\`'s`
			} balance: ${asCurrency(bal)}`
		);
	},
};
