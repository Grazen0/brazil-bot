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
	execute: async ({ channel, author, client, member }) => {
		if (await client.models.UserTickets.findByPk(author.id)) {
			channel.send('You already have the Brazil role, dummy');
			return;
		}

		const price = getPrice();

		const bal = await author.getBalance();
		if (price > bal) {
			channel.send("You don't have enough money lol");
			return;
		}

		await author.add(-price);
		await client.models.UserTickets.upsert({
			user_id: author.id,
			until: Date.now() + 1000 * 60 * 60 * 24,
		});

		await member.roles.add(config.brazilRole);
		author.send(
			`You bough a ticket to Brazil for one day (${asCurrency(
				price
			)}). Enjoy your trip!`
		);
	},
};
