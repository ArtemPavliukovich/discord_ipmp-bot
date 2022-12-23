const { SlashCommandBuilder } = require('discord.js');
const { commands, messages } = require('../config.js');
const { schedules } = require('../schedules');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.removeScheduleMeet.name)
		.setDescription(commands.removeScheduleMeet.description)
		.addStringOption(option =>
			option.setName(commands.removeScheduleMeet.options.name.name)
				.setDescription(commands.removeScheduleMeet.options.name.description)
				.setRequired(true),
		),
	async execute(interaction) {
		let response = '';
		const name = interaction.options.getString(commands.removeScheduleMeet.options.name.name);

		if (schedules.has(name)) {
			schedules.delete(name);
			response = messages.removeSchedule;
		} else {
			response = messages.notExistMeet;
		}

		await interaction.reply({
			content: response,
			ephemeral: true,
		});
	},
};