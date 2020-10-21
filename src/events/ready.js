const chalk = require('chalk');
const { Client } = require('discord.js');
const config = require('../../config.json');

/**
 * @param {Client} client
 */
module.exports = client => {
	const { user } = client;
	user.setActivity(config.activity);

	console.log(chalk.blue(`Logged in as ${user.tag}!`));
};
