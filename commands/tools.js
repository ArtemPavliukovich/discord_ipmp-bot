const { SlashCommandBuilder } = require('discord.js');
const { commands, tools } = require('../config.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.tools.name)
		.setDescription(commands.tools.description),
	async execute(interaction) {
    let responseMessage = '';

    tools.forEach(el => {
      responseMessage += `${el.name} - [${el.link}](${el.link})` + '\n';
    });

		await interaction.reply({
			content: responseMessage,
			ephemeral: true,
		});
	},
};