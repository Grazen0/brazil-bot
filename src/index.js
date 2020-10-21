const { Client } = require('discord.js');
const chalk = require('chalk');
const path = require('path');
const { listAll } = require('./utils');
const { Sequelize } = require('sequelize');

require('dotenv').config();

const client = new Client();

// Register all available commands
client.commands = listAll('./src/commands')
	.filter(path => /\.js$/.test(path))
	.map(file => require(path.join('..', file)));

// Register event listeners
for (const file of listAll('./src/events')) {
	const moduleName = file.split('\\').slice(-1)[0].replace(/\.js$/i, '');
	const eventName = (moduleName.match(/-[a-z]/g) || []).reduce(
		(acc, match) => acc.replace(match, match.charAt(1).toUpperCase()),
		moduleName
	);

	client.on(eventName, (...args) =>
		require(path.join('..', file))(client, ...args)
	);
}

(async () => {
	client.sequelize = new Sequelize({
		host: 'sql10.freemysqlhosting.net',
		database: 'sql10372189',
		username: 'sql10372189',
		password: process.env.DB_PASSWORD,
		port: 3306,
		dialect: 'mysql',
		logging: false,
	});

	// try {
	// 	console.log(chalk.cyan('Connecting to database...'));
	// 	await client.sequelize.authenticate();
	// 	await client.sequelize.sync();
	// } catch (err) {
	// 	console.error(err);
	// }

	const { TOKEN } = process.env;
	console.log(chalk.yellow(`Logging in with token ${TOKEN}...`));
	client.login(TOKEN);
})();
