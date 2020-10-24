import { MessageReaction, TextChannel, User } from 'discord.js';

const clear: Command = {
	name: 'clear',
	description: "Clears the bot's logs.",
	permissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
	execute: async ({ channel, client, author }) => {
		if (!(channel instanceof TextChannel)) return;
		const message = await channel.send(
			'Are you sure you want to clear the logs?'
		);
		const emojis = ['✅', '❌'];
		await Promise.all(emojis.map(emoji => message.react(emoji)));

		const filter = (reaction: MessageReaction, user: User) =>
			user.id === author.id && emojis.includes(reaction.emoji.name);

		const collected = await message.awaitReactions(filter, {
			max: 1,
			time: 10000,
		});

		const reaction = collected.first();
		if (!reaction || reaction.emoji.name === '❌') return;

		await client.models.Logs.destroy({ where: {}, truncate: true });
		channel.send('Logs cleared!');
	},
};

export default clear;
