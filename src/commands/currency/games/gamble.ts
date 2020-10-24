import { MessageEmbed, MessageReaction, User } from 'discord.js';
import config from '../../../config.json';
import { asCurrency } from '../../../util/utils';

const gamble: Command = {
	name: 'gamble',
	description: 'Gamble for $500',
	execute: async ({ channel, author, client }) => {
		const bal = await author.getBalance();
		const { gambleReward, gamblePrice, embedColor } = config;

		if (bal < gamblePrice) {
			channel.send(
				`You don't have enough money lol, you need ${asCurrency(gamblePrice)}`
			);
			return;
		}

		await author.add(-gamblePrice);

		const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣'];
		const message = await channel.send(
			new MessageEmbed()
				.setTitle('Gamble!')
				.setColor(embedColor)
				.setDescription(
					`React with any of these emojis for a chance of winning ${asCurrency(
						gambleReward
					)}!`
				)
		);

		Promise.all(emojis.map(emoji => message.react(emoji)));
		const filter = ({ emoji }: MessageReaction, user: User) =>
			user.id === author.id && emojis.includes(emoji.name);

		await message.awaitReactions(filter, {
			max: 1,
			time: 20000,
		});

		if (Math.random() < 1 / emojis.length) {
			await author.add(gambleReward);
			await client.log(`${author.tag} won a gamble`);
			channel.send(`Congratulations, you win ${asCurrency(gambleReward)}!`);
		} else {
			channel.send('Oof, you lost. Better luck next time!');
		}
	},
};

export default gamble;
