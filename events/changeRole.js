const { Events } = require('discord.js');
const { idGeneralChannel, welcomeRoles } = require('../config.js');

module.exports = {
	name: Events.GuildMemberUpdate,
	once: false,
	execute(oldMember, newMember) {
		if (oldMember.roles.cache.size < newMember.roles.cache.size) {
			const dateJoined = new Date(newMember.joinedTimestamp);
			const dateNow = new Date();
			// подумать над логикой чтоб лучше защитить
			if (dateJoined.getDay() === dateNow.getDay() && dateNow.getHours() - dateJoined.getHours() < 2) {
				const newRole = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));

				if (welcomeRoles.some(role => role === [...newRole][0][1].name)) {
					const idNewRole = [...newRole][0][0];
					const channel = newMember.guild.channels.cache.get(idGeneralChannel);
					channel.send(`Команду <@&${idNewRole}> 🙂 поздравляю с пополнением!`);
				}
			}
		}
	},
};