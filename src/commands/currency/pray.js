const config = require('../../../config.json');
const { asCurrency } = require('../../util/utils');

module.exports = {
	name: 'pray',
	description: 'Pray to the Brazil gods in exchange for a reward.',
	cooldown: 300000,
	execute: async ({ author, channel }) => {
		const { min, max } = config.prayReward;
		const reward = Math.floor(Math.random() * (max - min)) + min;

		await author.add(reward);
		channel.send(
			`You prayed to the gods and received \`${asCurrency(reward)}\``
		);
	},
};
