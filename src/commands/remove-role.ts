import config from '../config.json';

const removeRole: Command = {
	name: 'roleremove',
	description: 'Removes a person from the Brazil role.',
	usage: ['[@Member]'],
	permissions: ['MANAGE_ROLES'],
	execute: async ({ message, channel, client }) => {
		const member = message.mentions.members?.first();
		const { brazilRole } = config;

		if (!member) {
			channel.send('You need to mention a member!');
			return;
		}

		const {
			user: { tag },
		} = member;

		if (!member.roles.cache.get(brazilRole)) {
			channel.send(`${tag} doesn't have the Brazil role!`);
			return;
		}

		try {
			await member.roles.remove(brazilRole);
			await client.models.UserTickets.destroy({
				where: { user_id: member.id },
			});

			channel.send(`Removed Brazil role from \`${tag}\`!`);
		} catch (err) {
			channel.send(
				'An error ocurred while removing the role! This is most likely an issue with permissions.'
			);
		}
	},
};

export default removeRole;
