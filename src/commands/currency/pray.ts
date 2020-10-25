import config from '../../config.json';
import { asCurrency } from '../../util/utils';

const pray: Command = {
	name: 'pray',
	description: 'Pray to the Brazil gods in exchange for a reward.',
	cooldown: 300000,
	execute: async ({ author, channel }) => {
		const { min, max } = config.prayReward;
		const chance = 1;
		let reward = Math.floor(Math.random() * (max - min)) + min;

if (chance == 1) {
	reward = 100;
}

		await author.add(reward);
		channel.send(
			`You prayed to the gods and received \`${asCurrency(reward)}\``
		);
	},
};

export default pray;
