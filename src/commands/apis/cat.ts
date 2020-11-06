import { MessageAttachment } from 'discord.js';
import fetch from 'node-fetch';

const cat: Command = {
	name: 'cat',
	description: 'Gets a random cat!',
	execute: async ({ channel }) => {
		const res = await (
			await fetch('https://api.thecatapi.com/v1/images/search')
		).json();

		const attachment = new MessageAttachment(res[0].url, 'cat.png');
		channel.send(attachment).catch(console.error);
	},
};

export default cat;
