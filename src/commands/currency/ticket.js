const config = require('../../../config.json');
const { asCurrency } = require('../../util/utils');

module.exports = {
	name: 'ticket',
	description: `Buy a ticket to brazil for ${asCurrency(config.ticketPrice)}!`,
	execute: async ({}) => {},
};
