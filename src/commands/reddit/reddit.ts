import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import config from '../../config.json';

const reddit: Command = {
	name: 'reddit',
	description: 'Gets a random post from your specified subreddit',
	execute: async ({ channel, args: [name] }) => {
		if (!name) {
			channel.send('Please specify your subreddit.');
			return;
		}

		// Subreddit regex
		/**
		 * ^ - Match the start of the string
		 * ( - Group start
		 * ?: - Basically, "Match this group, but don't show in results"
		 * r\/ - Matches "r/" (It's necessary to escape "/")
		 * ) - Group end
		 * ? - "Everything inside the previous group was optional"
		 * ( - Another group start
		 * [a-z0-9_] - Match any letter, number or underscore
		 * {1,20} - Match the previous thing if repeated min. 2, max. 20
		 * ) - Another group end
		 * $ - Match the end of the string
		 */
		const regex = /^(?:r\/)?([a-z0-9_]{1,20})$/i;
		const match = regex.exec(name);

		if (!match) {
			channel.send('Invalid subreddit!');
			return;
		}

		const { data } = await (
			await fetch(
				`https://api.reddit.com/r/${match[1]}/hot.json?sort=top&t=day&limit=50`
			)
		).json();

		const children = data?.children;

		if (!children) {
			channel.send('No post found!');
			return;
		}

		children.sort(() => Math.random() - 0.5);

		const post = children.find(
			({ data: { over_18, post_hint } }: any) =>
				!over_18 && post_hint !== 'video'
		);

		if (!post) {
			channel.send("Couldn't find any posts");
			return;
		}

		const {
			data: { url, ups, num_comments, permalink, title, selftext = '', author },
		} = post;

		channel.send(
			new MessageEmbed()
				.setTitle(title)
				.setAuthor(`u/${author}`)
				.setURL(`https://reddit.com${permalink}`)
				.setColor(config.embedColor)
				.setImage(url)
				.setDescription(selftext)
				.setFooter(`👍 ${ups} | 💬 ${num_comments}`)
		);
	},
};

export default reddit;
