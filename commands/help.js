const { SlashCommandBuilder } = require('discord.js');
const { commands, commandsInfo } = require('../config.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.help.name)
		.setDescription(commands.help.description),
	async execute(interaction) {
    let responseMessage = '';

    commandsInfo.forEach(el => {responseMessage += el + '\n';});

		await interaction.reply({
			content: responseMessage,
			ephemeral: true,
		});
	},
};