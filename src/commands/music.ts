import config from '../config.json';
import ytdl from 'ytdl-core-discord';
import { VoiceChannel } from 'discord.js';

const music: Command = {
	name: 'music',
	description: 'Plays random Brazilian music.',
	execute: async ({ author, guild, client, channel }) => {
		const { me, channels } = guild;
		const { songs, musicChannel } = config;

		const vc = channels.cache.get(musicChannel);
		if (!me || !(vc instanceof VoiceChannel)) return;

		if (!(await client.models.UserTickets.findByPk(author.id))) {
			channel.send("You can't do this outside Brazil lol");
			return;
		}

		const { voice } = me;
		if (voice.channel) {
			channel.send("I'm already playing music!");
			return;
		}

		try {
			const connection = await vc.join();
			voice.setDeaf(true);

			const song = songs[Math.floor(Math.random() * songs.length)];
			if (!song) return;

			const dispatcher = connection.play(
				await ytdl(song, {
					filter: 'audioonly',
				}),
				{ type: 'opus' }
			);

			dispatcher.on('finish', vc.leave);

			channel.send(`**Now playing:** ${song}`);
		} catch (err) {
			console.error(err);
			vc.leave();
			channel.send('A weird error occurred! Tell the devs about this pls');
		}
	},
};

export default music;
