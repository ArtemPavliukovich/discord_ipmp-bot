const { Events } = require('discord.js');
const { idGeneralChannel, messages } = require('../config.js');

module.exports = {
	name: Events.GuildMemberAdd,
	once: false,
	execute(member) {
		const channel = member.guild.channels.cache.get(idGeneralChannel);
		channel.send(messages.addUser(member.user.id));
	},
};