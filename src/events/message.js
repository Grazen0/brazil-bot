const { Client, Message } = require('discord.js');
const config = require('../../config.json');

/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
	const { content, author, member, channel, guild } = message;

	const { prefix } = config;
	if (!guild || author.bot || !content.toLowerCase().startsWith(prefix)) return;

	const [search, ...args] = content.slice(prefix.length).split(/\s+/);

	const command = client.findCommand(search || '');
	if (!command) return;

	const { permissions = [], name, cooldown = 0 } = command;
	if (!member.hasPermission(permissions)) {
		channel.send(
			`You need the following permissions to run this command: \`${permissions
				.map(perm => `\`${perm}\``)
				.join(', ')}\``
		);
		return;
	}

	if (!author.lastCommand) author.lastCommand = {};

	const now = Date.now();
	const diff = now - (author.lastCommand[name] || 0);
	if (diff < cooldown) {
		channel.send(
			`Hold up! You have to wait \`${
				Math.floor((cooldown - diff) / 10) / 100
			}s\` before using this command!`
		);
		return;
	}

	author.lastCommand[name] = now;

	command
		.execute({
			author,
			member,
			args,
			guild,
			client,
			message,
			channel,
		})
		.catch(console.error);
};
