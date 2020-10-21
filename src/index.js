const { Client } = require('discord.js');
const chalk = require('chalk');
const path = require('path');
const { listAll } = require('./utils');

require('dotenv').config();

const client = new Client();

// Register all available commands
client.commands = listAll(path.join(__dirname, 'commands'))
	.filter(path => /\.js$/.test(path))
	.map(path => require(path));

// Register event listeners
for (const file of listAll(path.join(__dirname, 'events'))) {
	const moduleName = file.split('\\').slice(-1)[0].replace(/\.js$/i, '');
	const eventName = (moduleName.match(/-[a-z]/g) || []).reduce(
		(acc, match) => acc.replace(match, match.charAt(1).toUpperCase()),
		moduleName
	);

	client.on(eventName, (...args) => require(file)(client, ...args));
}

console.log(chalk.yellow('Logging in...'));
client.login(process.env.TOKEN);
