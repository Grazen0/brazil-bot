import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import config from '../../config.json';

const mcservstat: Command = {
	name: 'mcservstat',
	description: 'Find Minecraft Server Info',
	cooldown: 10000,
	async execute({ channel, args }) {
		if (!args.length) {
			channel.send('Please mention a server');
			return;
		}

		const res = await (
			await fetch(`https://api.mcsrvstat.us/2/${args[0]}`)
		).json();

		if (!res.ip) {
			channel.send('That is not a valid server!');
			return;
		}

		const {
			online = false,
			ip = '[no ip provided]',
			hostname = ip,
			motd = { clean: '[no motd]' },
			players = { online: 0, max: 0 },
			version = '[no version specified]',
		} = res;

		channel.send(
			new MessageEmbed()
				.setTitle(hostname)
				.setURL(`https://mcsrvstat.us/server/${hostname}`)
				.setDescription(
					online ? 'This server is online' : 'This server is offline'
				)
				.addFields(
					{ name: 'Motd', value: (online) ? motd.clean : "This server is offline", inline: false },
					{
						name: 'Online players',
						value: `${players.online} / ${players.max}`,
						inline: true,
					},
					{ name: 'Server version', value: version, inline: true }
				)
				.setColor(config.embedColor)
		);
	},
};

export default mcservstat;
