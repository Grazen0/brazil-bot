import { MessageEmbed } from 'discord.js';
import config from '../../config.json';

const query: Command = {
	name: 'query',
	description: '',
	execute: async ({ channel, args, author, client }) => {
		if (!config.owners.includes(author.id)) {
			channel.send("You don't have permission to use this command!");
			return;
		}

		try {
			const [results] = await client.sequelize.query(args.join(' '));
			channel.send(
				new MessageEmbed()
					.setColor('6bf553')
					.setTitle('Query Results')
					.setDescription(`\`\`\`${JSON.stringify(results, null, 2)}\`\`\``)
			);
		} catch (err) {
			channel.send(
				new MessageEmbed()
					.setColor('ff5252')
					.setTitle('Error')
					.setDescription(err)
			);
		}
	},
};

export default query;
