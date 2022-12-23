const { SlashCommandBuilder } = require('discord.js');
const { commands, messages } = require('../config.js');
const { schedules } = require('../schedules');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.meets.name)
		.setDescription(commands.meets.description),
	async execute(interaction) {
		let response = '';

		if (schedules.size) {
			for (let name of schedules.keys()) {
				response += `${name} `;
			}
		} else {
			response = messages.notMeets;
		}

		await interaction.reply({
			content: response,
			ephemeral: true,
		});
	},
};