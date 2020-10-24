import { MessageEmbed } from 'discord.js';
import config from '../config.json';

const help: Command = {
	name: 'help',
	description: "Shows this bot's command list.",
	usage: ['(command)'],
	aliases: ['commands'],
	execute: async ({ channel, client, args }) => {
		const command = client.findCommand(args[0] || '');
		if (!command) {
			channel.send(
				new MessageEmbed()
					.setTitle("Brazil Bot's commands")
					.setColor(config.embedColor)
					.setDescription(
						`\`\`\`${client.commands
							.filter(({ description }) => description !== '')
							.map(({ name, description }) => `${name} - ${description}`)
							.join('\n')}\`\`\``
					)
					.setFooter(`(Use "${config.prefix}" before each command!)`)
			);
			return;
		}

		const {
			name,
			description,
			aliases = [],
			permissions = [],
			usage = [],
		} = command;

		const embed = new MessageEmbed()
			.setTitle(`Command: \`${name}\``)
			.setColor(config.embedColor)
			.setDescription(description)
			.addField(
				'Usage:',
				'`' +
				config.prefix +
				name +
				(usage.length ? ` ${usage.join(' ')}` : '') +
				'`'
			);

		if (aliases.length) {
			embed.addField(
				'Aliases:',
				aliases.map(alias => `\`${alias}\``).join(', '),
				false
			);
		}

		if (permissions.length) {
			embed.addField(
				'Required permissions:',
				permissions.map(perm => `\`${perm}\``).join(', '),
				false
			);
		}

		channel.send(embed);
	},
};

export default help;
