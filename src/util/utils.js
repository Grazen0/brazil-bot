const fs = require('fs');
const path = require('path');
const { User, Client } = require('discord.js');

User.prototype.lastCommand = {};

Client.prototype.commands = [];
Client.prototype.findCommand = function (search = '') {
	if (!search) return;
	return this.commands.find(
		({ name, aliases = [] }) =>
			name.toLowerCase() === search.toLowerCase() ||
			aliases.some(alias => alias.toLowerCase() === search.toLowerCase())
	);
};

const listAll = folder =>
	fs.readdirSync(folder).reduce((acc, file) => {
		const filePath = path.join(folder, file);
		return [
			...acc,
			...(fs.statSync(filePath).isDirectory() ? listAll(filePath) : [filePath]),
		];
	}, []);

const asCurrency = amount =>
	amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

module.exports = {
	listAll,
	asCurrency,
};
