const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildMemberAdd,
	once: false,
	async execute(member) {
		const channel = member.guild.channels.cache.get('1055125402009477154');
		channel.send(`<@${member.user.id}> приветствую! У нас тут песочница, но всё по-взрослому, вливайся!`);
	},
};