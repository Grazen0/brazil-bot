const { Client } = require('discord.js');
const chalk = require('chalk');
const path = require('path');
const { listAll } = require('./util/utils');
const { Sequelize } = require('sequelize');
const clientExtension = require('./util/extensions/Client');
const userExtension = require('./util/extensions/User');

require('dotenv').config();

const client = new Client();

// Register all available commands
client.commands = listAll('./src/commands')
	.filter(path => /\.js$/.test(path))
	.map(file => require(path.join('..', file)));

// Register event listeners
for (const file of listAll('./src/events')) {
	const moduleName = file
		.split(/(\\|\/)/)
		.slice(-1)[0]
		.replace(/\.js$/i, '');
	const eventName = (moduleName.match(/-[a-z]/g) || []).reduce(
		(acc, match) => acc.replace(match, match.charAt(1).toUpperCase()),
		moduleName
	);

	client.on(eventName, (...args) =>
		require(path.join('..', file))(client, ...args)
	);
}

(async () => {
	const sequelize = new Sequelize({
		host: 'sql10.freemysqlhosting.net',
		database: 'sql10372189',
		username: 'sql10372189',
		password: process.env.DB_PASSWORD,
		port: 3306,
		dialect: 'mysql',
		logging: false,
	});

	try {
		// Sequelize startup
		console.log(chalk.cyan('Connecting to database...'));
		client.models = {
			UserCurrency: require('./models/UserCurrency')(sequelize),
		};

		// Connect to database
		await sequelize.authenticate();
		await sequelize.sync({
			force: process.argv.find(arg => arg.toLowerCase() === '--force'),
		});
		client.sequelize = sequelize;

		// Extensions
		clientExtension();
		userExtension(client.models.UserCurrency);

		// Bot login
		const { TOKEN } = process.env;
		console.log(chalk.yellow(`Logging in...`));
		client.login(TOKEN);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
})();
