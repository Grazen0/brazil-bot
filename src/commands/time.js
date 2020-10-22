module.exports = {
	name: 'time',
	description: 'Shows your time left in Brazil',
	execute: async ({ author, channel, client }) => {
		const result = await client.models.UserTickets.findByPk(author.id);
		if (!result) {
			channel.send("You don't have any tickets to Brazil lmao");
			return;
		}

		const rest = result.until - Date.now();
		const hours = Math.floor(rest / 3600000);
		const minutes = Math.floor(rest / 60000) - hours * 60;

		channel.send(
			`You have ${hours} hours and ${minutes} minutes left in Brazil.`
		);
	},
};
