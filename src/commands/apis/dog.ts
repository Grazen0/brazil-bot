import { MessageAttachment } from 'discord.js';
import fetch from 'node-fetch';

const dog: Command = {
	name: 'dog',
	description: 'Shows a random image of a dog!',
	async execute({ channel }) {
		const [dog] = await (
			await fetch('https://api.thedogapi.com/v1/images/search')
		).json();

		const attachment = new MessageAttachment(dog.url, 'dog.png');
		channel.send(attachment).catch(console.error);
	},
};

export default dog;
