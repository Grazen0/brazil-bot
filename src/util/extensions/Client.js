const { Client } = require('discord.js');

module.exports = () => {
	Client.prototype.commands = [];
};
