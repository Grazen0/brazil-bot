const config = require('../../../config.json');
const { asCurrency } = require('../../util/utils');
let ticketPrice = config.ticketPrice;

module.exports = {
	name: 'ticket',
	description: `Buy a ticket to brazil for ${asCurrency(ticketPrice)}!`,
	execute: async ({message, args}) => {
		const date = new Date();
		const day = date.getDay();
		if (day == 6) {
			ticketPrice = 1500;
		}
	},
};
