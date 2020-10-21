const config = require('../../config.json');

module.exports = {
	name: 'roleremove',
	description: 'Removes a person from the Brazil role',
	usage: ['[@Member]'],
	execute: async (message, args, mentions) => {
		const brazilRole = config;

		if (!mentions.users.size) {
			message.channel.send("Please mention a user");
		}

		else if (member.roles.has(brazilRole)) {
			const member = mentions.members.first();
			await member.removeRole(brazilRole);
			message.channel.send(`Removed role from ${member}`);
		}
	},
};
