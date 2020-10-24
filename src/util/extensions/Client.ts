import { Client } from 'discord.js';

export default () => {
	Client.prototype.commands = [];

	Client.prototype.findCommand = function (search = '') {
		if (!search) return;
		return this.commands.find(
			({ name = '', aliases = ([] as string[]) }) =>
				name.toLowerCase() === search.toLowerCase() ||
				aliases.some(alias => alias.toLowerCase() === search.toLowerCase())
		);
	};

	Client.prototype.log = async function (message: string) {
		if (!message) throw new Error('Cannot log empty message');

		await this.models.Logs.create({
			message,
			date: Date.now(),
		});
	};
};
