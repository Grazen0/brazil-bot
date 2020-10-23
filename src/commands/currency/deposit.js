const { asCurrency } = require('../../util/utils');

module.exports = {
	name: 'deposit',
	description: 'Transfers money to another user.',
	usage: ['@User', '[amount]'],
	execute: async ({ author, args, message, channel }) => {
		const amount = parseInt(args[1]);
		if (!amount || amount <= 0) {
			channel.send('You must enter a valid amount!');
			return;
		}

		const victim = message.mentions.users.first();
		if (!victim) {
			channel.send('You must mention someone to deposit the money lmao');
			return;
		}

		if ((await author.getBalance()) < amount) {
			channel.send("You don't have that much money, lmao you're broke");
			return;
		}

		await author.add(-amount);
		await victim.add(amount);

		channel.send(
			`Successfully transferred ${asCurrency(amount)} to \`${victim.tag}\`!`
		);
	},
};
