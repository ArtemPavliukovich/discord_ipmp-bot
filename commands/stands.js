const { SlashCommandBuilder } = require('discord.js');
const { commands, stands } = require('../config.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.stands.name)
		.setDescription(commands.stands.description),
	async execute(interaction) {
    let responseMessage = '';

    stands.forEach(el => {
      responseMessage += `${el.name} - [${el.link}](${el.link}) (${el.decscription})` + '\n';
    });

		await interaction.reply({
			content: responseMessage,
			ephemeral: true,
		});
	},
};