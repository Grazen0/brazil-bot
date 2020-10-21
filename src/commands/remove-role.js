const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'RoleRemove',
	description: "Removes a person from the bot role",
	usage: ['(command)'],
	execute(message, args) {
		const member = message.mentions.members.first();
    const brazilRole = config;


   if(member.roles.has(brazilRole))
      {

      await(message.member.removeRole(brazilRole));

      try{
        console.log(`removed role from ${member}`);
      } catch(e){

      }

 }
	},
};
