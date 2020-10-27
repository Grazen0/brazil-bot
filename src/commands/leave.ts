import config from '../config.json';

const leave: Command = {
	name: 'leave',
	description: 'Instantly flight back from Brazil. (y tho?)',
	execute: async ({ author, channel, client, member }) => {
		if (!(await client.models.UserTickets.findByPk(author.id))) {
			channel.send('You are not currently in Brazil!');
			return;
		}

		await client.models.UserTickets.destroy({ where: { user_id: author.id } });
		await member.roles.remove(config.brazilRole);
		await client.log(`${author.tag} left Brazil with leave command.`);
	},
};

export default leave;
