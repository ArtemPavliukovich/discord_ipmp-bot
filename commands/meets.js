const { SlashCommandBuilder } = require('discord.js');
const { commands, messages } = require('../config.js');
const { tasks } = require('../tasks');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.meets.name)
		.setDescription(commands.meets.description),
	async execute(interaction) {
		let response = '';

		if (tasks.size) {
			for (let name of tasks.keys()) {
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