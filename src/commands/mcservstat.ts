import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import config from '../config.json';

const mcservstat: Command = {
	name: 'mcservstat',
	description: 'Find Minecraft Server Info',
	cooldown: 300000,
	execute: async ({ channel, args }) => {
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
			online,
			ip,
			hostname = ip,
			motd = { clean: '[no motd]' },
			players: { online: onlinePlayers, max },
			version,
		} = res;

		channel.send(
			new MessageEmbed()
				.setTitle(hostname)
				.setDescription(
					`${online ? 'This server is online' : 'This server is offline'}
            Motd = ${motd.clean}
            Players = ${onlinePlayers} / ${max}
            Version = ${version}
          `
				)
				.setColor(config.embedColor)
		);
	},
};

export default mcservstat;
