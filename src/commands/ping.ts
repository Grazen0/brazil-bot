import { MessageEmbed } from 'discord.js';
import config from '../config.json';

const ping: Command = {
	name: 'ping',
	description: 'Shows my ping',
	usage: ['ping'],
	execute: async ({ channel, message, client }) => {


		await channel.send(
			new MessageEmbed()
				.setTitle('Pong, My ping is ')
				.setDescription(`Pong, Latency is ${(Date.now() - message.createdTimestamp) * 2}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
				.setColor(config.embedColor)
		);
	},
};

export default ping;
