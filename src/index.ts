import chalk from 'chalk';
import { Client } from 'discord.js';
import dotenv from 'dotenv';
import path from 'path';
import { Sequelize } from 'sequelize';
import Logs from './models/Logs';
import UserCurrency from './models/UserCurrency';
import UserTickets from './models/UserTickets';
import clientExtension from './util/extensions/Client';
import userExtension from './util/extensions/User';
import { listAll } from './util/utils';

dotenv.config();

const client = new Client();

(async () => {
	// Register all available commands
	client.commands = (
		await Promise.all(
			listAll(path.join(__dirname, 'commands'))
				.filter(path => /\.(js|ts)$/i.test(path))
				.map(file => import(file))
		)
	)
		.map(imported => imported.default)
		.filter(command => command?.name);

	// Register event listeners
	listAll(path.join(__dirname, 'events')).forEach(async file => {
		const moduleName = file
			.split(/(\\|\/)/)
			.slice(-1)[0]
			.replace(/\.(js|ts)$/i, '');

		const eventName = (moduleName.match(/-[a-z]/g) || []).reduce(
			(acc, match) => acc.replace(match, match.charAt(1).toUpperCase()),
			moduleName
		);

		const func = (await import(file)).default;

		client.on(eventName, (...args) => func(client, ...args));
	});

	// Database setup
	const sequelize = new Sequelize({
		host: 'sql10.freemysqlhosting.net',
		database: 'sql10372189',
		username: 'sql10372189',
		password: process.env.DB_PASSWORD,
		port: 3306,
		dialect: 'mysql',
		logging: false,
	});

	// Sequelize startup
	console.log(chalk.cyan('Connecting to database...'));
	client.models = {
		UserCurrency: UserCurrency(sequelize),
		UserTickets: UserTickets(sequelize),
		Logs: Logs(sequelize),
	};

	try {
		// Connect to database
		await sequelize.authenticate();
		await sequelize.sync({
			force: process.argv.some(arg => arg.toLowerCase() === '--force'),
		});
		client.sequelize = sequelize;

		// Extensions
		clientExtension();
		userExtension(client.models);

		// Bot login
		console.log(chalk.yellow(`Logging in...`));
		client.login(process.env.TOKEN);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
})();
