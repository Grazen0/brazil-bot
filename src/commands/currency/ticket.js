const config = require('../../../config.json');
const { asCurrency } = require('../../util/utils');

const getPrice = () =>
	config.ticketPrice *
	(new Date().getDay() === 0 /* This is sunday btw */
		? config.sundayDiscount
		: 1);

module.exports = {
	name: 'ticket',
	description: `Buy a ticket to brazil for ${asCurrency(getPrice())}!`,
	execute: async ({ message, args }) => {
		const price = getPrice();
	},
};
