const { Events } = require('discord.js');
const { idGeneralChannel } = require('../config.js');

module.exports = {
	name: Events.GuildMemberAdd,
	once: false,
	execute(member) {
		const channel = member.guild.channels.cache.get(idGeneralChannel);
		channel.send(`<@${member.user.id}> приветствую! У нас тут песочница, но всё по-взрослому, вливайся!`);
	},
};