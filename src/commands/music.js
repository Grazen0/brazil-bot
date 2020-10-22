const config = require('../../config.json');
const ytdl = require('ytdl-core-discord');
const {
	User,
	Guild,
	Client,
	TextChannel,
	VoiceChannel,
} = require('discord.js');

module.exports = {
	name: 'music',
	description: 'Plays random Brazilian music.',
	/**
	 * @param {{author: User, guild: Guild, client: Client, channel: TextChannel}} e
	 */
	execute: async e => {
		const { author, guild, client, channel } = e;
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

			console.log(song);
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
