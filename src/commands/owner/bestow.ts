import config from '../../config.json';
import { asCurrency } from '../../util/utils';

const bestow: Command = {
	name: 'bestow',
	description: '',
	aliases: ['give', 'gift'],
	execute: async ({ author, channel, args, message, guild }) => {
		if (!config.owners.includes(author.id)) {
			channel.send("You don't have permission for this!");
			return;
		}

		const [id, amount] = args;
		const reward = parseInt(amount);
		const member = id.match(/^[0-9]{18}$/)
			? guild.members.cache.get(id)
			: message.mentions.members?.first();

		if (isNaN(reward)) {
			channel.send('Please add a valid number');
			return;
		}

		if (!member) {
			channel.send('pls mention a user');
			return;
		}

		await member.user.add(reward);
		channel.send(`${member} received \`${asCurrency(reward)}\``);
	},
};

export default bestow;
