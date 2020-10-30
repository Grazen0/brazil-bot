import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import config from '../config.json';

const meme: Command = {
	name: 'meme',
	description: 'Gets a random meme from Reddit (r/memes)',
	execute: async ({ channel }) => {
		const {
			data: { children },
		} = await (
			await fetch(
				'https://api.reddit.com/r/memes/hot.json?sort=top&t=day&limit=50'
			)
		).json();

		children.sort(() => Math.random() - 0.5)

		const post = children.find(
			({ data: { over_18, post_hint } }) => !over_18 && post_hint === 'image'
		);

		if (!post) {
			channel.send("Couldn't find any juicy memes!");
			return;
		}

		const { url, ups, num_comments, permalink, title } = post.data;

		channel.send(
			new MessageEmbed()
				.setTitle(title)
				.setURL(`https://reddit.com${permalink}`)
				.setColor(config.embedColor)
				.setImage(url)
				.setFooter(`👍 ${ups} | 💬 ${num_comments}`)
		);
	},
};

export default meme;
