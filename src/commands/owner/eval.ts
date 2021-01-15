import config from '../../config.json';

const eval: Command = {
  name: 'eval',
  description: 'Evaluates a JavaScript expression.',
  async execute(e) {
    const { author, args, channel } = e;
    if(!config.owners.includes(author.id)) return;
    
    if (!args.length) {
      channel.send('You need to enter an expression bruh');
      return;
    }
    
    try {
      const result = eval(args.join(' '));
      channel.send(`Result: ${result}`);
    } catch (err) {
      console.error(err);
      channel.send('An error occurred lol')
    }
  }
};

export default eval;
