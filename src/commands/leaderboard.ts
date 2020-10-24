import { MessageEmbed } from 'discord.js';
import config from '../config.json';

const leaderBoard: Command = {
	name: 'leaderboard',
	description: 'Bot Leaderboard',
	execute: async ({ channel, client }) => {
    const user = await client.models.UserCurrency.findAll();
    //const username = user.username;
    //const balance = await user.getBalance();
		/*await channel.send(
			new MessageEmbed()
				.setTitle('BrazilBot\'s Leaderboard')
				.setDescription(
					`Username:${username}\nBalance:${balance}`
				)
				.setColor(config.embedColor)
		);*/
    console.log(user);
	},
};

export default leaderBoard;
