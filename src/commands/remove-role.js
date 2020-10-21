const config = require('../../config.json');

module.exports = {
	name: 'roleremove',
	description: 'Removes a person from the Brazil role',
	usage: ['[@Member]'],
	execute: async (message, args) => {
		const brazilRole = config;

		if (!message.mentions.users.size) {
			message.channel.send("Please mention a user");
		} else {
			const mentionMember = mentions.members.first();
			if (mentionMember.roles.has(brazilRole)) {
			await mentionMember.removeRole(brazilRole);
			message.channel.send(`Removed role from ${member}`);
		}
	}
	},
};
