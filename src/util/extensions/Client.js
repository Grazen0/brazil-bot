const { Client } = require('discord.js');

module.exports = () => {
	Client.prototype.commands = [];

	Client.prototype.findCommand = function (search = '') {
		if (!search) return;
		return this.commands.find(
			({ name = '', aliases = [] }) =>
				name.toLowerCase() === search.toLowerCase() ||
				aliases.some(alias => alias.toLowerCase() === search.toLowerCase())
		);
	};

	Client.prototype.log = async function (message) {
		if (!message) throw new Error('Cannot log empty message');

		await this.models.Logs.create({
			message,
			date: Date.now(),
		});
	};
};
