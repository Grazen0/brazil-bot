const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'RoleRemove',
	description: "Removes a person from the bot role",
	usage: ['(command)'],
	execute(message, args) {
		const member = message.mentions.members.first();
    //const role = role thing;


   if(member.roles.has(role))
      {

      await(message.member.removeRole(role));

      try{
        console.log(`removed role from ${member}`);
      } catch(e){

      }

 }
	},
};
