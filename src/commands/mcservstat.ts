import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import config from '../config.json';

const mcservstat: Command = {
	name: 'mcservstat',
	description: 'Find Minecraft Server Info',
	cooldown: 300000,
	execute: async ({ channel, args }) => {

if (!args.length) {
  channel.send("Please mention a server");
  return;
}

const { online, hostname, ip, motd, players, version } = await (
			await fetch(
				`https://api.mcsrvstat.us/2/${args[0]}`
			)
		).json();

const name = (hostname) ? hostname : ip;

if (!name) {
  channel.send("That is not a valid server");
  return;
}


		await channel.send(
			new MessageEmbed()
				.setTitle(name)
				.setDescription(
					`${(online) ? "This server is online" : "This server is offline"}
            Motd = ${motd.clean}
            Players = ${players.online}/${players.max}
            Version = ${version}
          `
				)
				.setColor(config.embedColor)
		);
	},
};

export default mcservstat;
