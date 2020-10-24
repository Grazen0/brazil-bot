import config from '../../config.json';
import { asCurrency } from '../../util/utils';

const bestow: Command = {
	name: 'bestow',
	description: '',
	aliases: ['give', 'gift'],
	execute: async ({ author, channel, args, message }) => {
		if (!config.owners.includes(author.id)) {
			channel.send("You don't have permission for this!");
			return;
		}

		const reward = parseInt(args[1]);
		const member = message.mentions.users.first();

		if (isNaN(reward)) {
			channel.send('Please add a valid number');
			return;
		}

		if (!member) {
			channel.send('pls mention a user');
			return;
		}

		await member.add(reward);
		channel.send(`${member} received \`${asCurrency(reward)}\``);
	},
};

export default bestow;
