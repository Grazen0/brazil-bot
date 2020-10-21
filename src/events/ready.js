const chalk = require('chalk');

module.exports = client => {
	console.log(chalk.blue(`Logged in as ${client.user.tag}!`));
};
