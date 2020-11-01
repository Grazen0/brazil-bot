import config from '../../config.json';
import { asCurrency } from '../../util/utils';

const bestow: Command = {
	name: 'bestow',
	description: '',
	aliases: ['give', 'gift'],
	execute: async ({ author, channel, args, message, client }) => {
		if (!config.owners.includes(author.id)) {
			channel.send("You don't have permission for this!");
			return;
		}

		const [id, amount] = args;
		const reward = parseInt(amount);
		const user = id.match(/^[0-9]{18}$/)
			? client.users.cache.get(id)
			: message.mentions.users?.first();

		if (isNaN(reward)) {
			channel.send('Please add a valid number');
			return;
		}

		if (!user) {
			channel.send('Please mention a user');
			return;
		}

		if (user.bot) {
			channel.send('That user is a bot');
			return;
		}

		await user.add(reward);
		channel.send(`${user.tag} received \`${asCurrency(reward)}\``);
	},
};

export default bestow;
