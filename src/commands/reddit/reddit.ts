import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import config from '../../config.json';

const reddit: Command = {
	name: 'reddit',
	description: 'Gets a random post from your specified subreddit',
	execute: async ({ channel, args }) => {

    if (!args.length) {
      channel.send("Please specify your subreddit.");
      return;
    }

    const subreddit = args[0];

		const {data} = await (
			await fetch(
				`https://api.reddit.com/r/${subreddit}/hot.json?sort=top&t=day&limit=50`
			)
		).json();

 const children = data?.children;

 if (!children) {
   channel.send("That is not a valid subreddit.");
 }

		children.sort(() => Math.random() - 0.5);

		const post = children.find(({ data: { over_18, post_hint } }: any) => !over_18 && post_hint != 'Video');

		if (!post) {
			channel.send("Couldn't find any posts");
			return;
		}

		const {
			data: { url, ups, num_comments, permalink, title, selftext, author },
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
