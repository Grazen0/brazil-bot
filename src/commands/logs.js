const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'logs',
	description: "Shows the bot's logs.",
	permissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
	execute: async ({ channel, author, client }) => {
		const logs = await client.models.Logs.findAll();
		if (!logs.length) {
			channel.send('There are currently no logs!');
			return;
		}

		const rows = logs.map(({ date, message }) => {
			const d = new Date(date);
			return `${d.getDate()}/${
				d.getMonth() + 1
			}/${d.getFullYear()} - ${message}`;
		});

		await author.send(
			new MessageEmbed()
				.setTitle('Brazil Bot logs:')
				.setColor(config.embedColor)
				.setDescription(rows.join('\n'))
		);

		channel.send('Logs sent!');
	},
};
