import fetch from 'node-fetch';
import { MessageAttachment } from 'discord.js';

const cursed: Command = {
  name: 'cursed',
  description: 'Find a cursed image',
  async execute({channel}) {
    const res = await (
      await fetch(`https://cursed-images-api.herokuapp.com/api/search`)
    ).json();

    const {
      url
    } = res;

    const attachment = new MessageAttachment(url, 'image.png');
		channel.send(attachment).catch(console.error);

  },
};

export default cursed;
