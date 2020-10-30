import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import config from '../../config.json';

const dadjoke: Command = {
	name: 'dadjoke',
	description: 'Gets a random dad joke from Reddit (r/dadjokes)',
	execute: async ({ channel }) => {
		const {
			data: { children },
		} = await (
			await fetch(
				'https://api.reddit.com/r/dadjokes/hot.json?sort=top&t=day&limit=50'
			)
		).json();

		children.sort(() => Math.random() - 0.5);

		const post = children.find(({ data }: any) => !data.over_18);

		if (!post) {
			channel.send("Couldn't find any dad jokes");
			return;
		}

		const {
			data: { ups, num_comments, permalink, title, selftext = '', author },
		} = post;

		channel.send(
			new MessageEmbed()
				.setTitle(title)
				.setAuthor(`u/${author}`)
				.setURL(`https://reddit.com${permalink}`)
				.setColor(config.embedColor)
				.setDescription(selftext)
				.setFooter(`👍 ${ups} | 💬 ${num_comments}`)
		);
	},
};

export default dadjoke;
