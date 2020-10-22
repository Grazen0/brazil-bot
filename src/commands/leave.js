const config = require('../../config.json');

module.exports = {
	name: 'leave',
	description: 'Instantly flight back from Brazil. (y tho?)',
	execute: async ({ author, channel, client, member }) => {
		if (!(await client.models.UserTickets.getByPk(author.id))) {
			channel.send('You are not currently in Brazil!');
			return;
		}

		await client.models.UserTickets.destroy({ where: { user_id: author.id } });
		await member.roles.remove(config.brazilRole);
	},
};
