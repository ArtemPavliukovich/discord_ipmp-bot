const { Events } = require('discord.js');
const { messages } = require('../config.js');

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) {
			return;
		}

		const command = interaction.client.commands.get(interaction.commandName);

		if (command) {
			try {
				await command.execute(interaction);
			} catch (error) {
				await interaction.reply({content: messages.commandsError, ephemeral: true});
			}
		}
	},
};