const { Client } = require('discord.js');

module.exports = () => {
	Client.prototype.commands = [];
	Client.prototype.findCommand = function (search = '') {
		if (!search) return;
		return this.commands.find(
			({ name, aliases = [] }) =>
				name.toLowerCase() === search.toLowerCase() ||
				aliases.some(alias => alias.toLowerCase() === search.toLowerCase())
		);
	};
};
