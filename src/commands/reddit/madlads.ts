import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import config from '../../config.json';

const madlads: Command = {
	name: 'madlads',
	description: 'Gets a random post from Reddit (r/madlads)',
	execute: async ({ channel }) => {
		const {
			data: { children },
		} = await (
			await fetch(
				'https://api.reddit.com/r/madlads/hot.json?sort=top&t=day&limit=50'
			)
		).json();

		children.sort(() => Math.random() - 0.5);

		const post = children.find(
			({ data: { over_18, post_hint } }: any) =>
				!over_18 && post_hint === 'image'
		);

		if (!post) {
			channel.send("Couldn't find any juicy posts!");
			return;
		}

		const {
			data: { url, ups, num_comments, permalink, title, author },
		} = post;

		channel.send(
			new MessageEmbed()
				.setTitle(title)
				.setAuthor(`u/${author}`)
				.setURL(`https://reddit.com${permalink}`)
				.setColor(config.embedColor)
				.setImage(url)
				.setFooter(`👍 ${ups} | 💬 ${num_comments}`)
		);
	},
};

export default madlads;
