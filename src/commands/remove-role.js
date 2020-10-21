const config = require('../../config.json');

module.exports = {
	name: 'roleremove',
	description: 'Removes a person from the Brazil role',
	usage: ['[@Member]'],
	execute: async (message, args) => {
		const member = message.mentions.members.first();
		const brazilRole = config;

		if (member.roles.has(brazilRole)) {
			await message.member.removeRole(brazilRole);
			message.channel.send(`Removed role from ${member}`);
		}
	},
};
