import { MessageEmbed } from 'discord.js';
import config from '../config.json';

const cool: Command = {
	name: 'cool',
	description: 'Find your cool%',
	execute: async ({ channel, author }) => {
    const cool = Math.floor(Math.random() * 100);

if (author.id === config.owners ) {
	await channel.send(
		new MessageEmbed()
			.setTitle(`${author.username}'s Cool Percentage`)
			.setDescription(`${author.username} is **${cool}%** cool`)
			.setFooter("nice")
			.setColor(config.embedColor)
	);
	return;
}

    if (cool == 69) {
      await channel.send(
  			new MessageEmbed()
  				.setTitle(`${author.username}'s Cool Percentage`)
  				.setDescription(`${author.username} is **${cool}%** cool`)
          .setFooter("nice")
  				.setColor(config.embedColor)
  		);
    } else {
		await channel.send(
			new MessageEmbed()
				.setTitle(`${author.username}'s Cool Percentage`)
				.setDescription(`${author.username} is **${cool}%** cool`)
				.setColor(config.embedColor)
		);}
	},
};

export default cool;
