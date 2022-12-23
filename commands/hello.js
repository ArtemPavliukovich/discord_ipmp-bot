const { SlashCommandBuilder } = require('discord.js');
const { commands, messages } = require('../config.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.hello.name)
		.setDescription(commands.hello.description),
	async execute(interaction) {
		await interaction.reply({
			content: messages.hello(interaction.user.username),
			ephemeral: true,
		});
	},
};