import config from '../../config.json';
import { asCurrency } from '../../util/utils';

const bestow: Command = {
	name: 'bestow',
	description: '',
	aliases: ['give', 'gift'],
	execute: async ({ author, channel, args, client }) => {
		if (!config.owners.includes(author.id)) {
			channel.send("You don't have permission for this!");
			return;
		}

		const [id, amount] = args;
		const reward = parseInt(amount);

		const regex = /^[0-9]{18}$|(?<=^<@!?)[0-9]{18}(?=>$)/;
		const match = regex.exec(id);
		if (!match) {
			channel.send('pls mention a user or ID');
			return;
		}

		const user = client.users.cache.get(match[0]);
		if (!user) {
			channel.send('User not found!');
			return;
		}

		if (isNaN(reward)) {
			channel.send('Please add a valid number');
			return;
		}

		await user.add(reward);
		channel.send(`${user} received \`${asCurrency(reward)}\``);
	},
};

export default bestow;
