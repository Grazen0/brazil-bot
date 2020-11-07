import fetch from 'node-fetch';
import config from '../../config.json';

const cursed: Command = {
  name: 'cursed',
  description: 'Find a cursed image',
  async execute({channel}) {
    channel.send('not done yet');
    channel.send('https://cursed-images-api.herokuapp.com');
  },
};

export default cursed;
