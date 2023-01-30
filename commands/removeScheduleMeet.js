const { SlashCommandBuilder } = require('discord.js');
const { commands, messages } = require('../config.js');
const { tasks } = require('../tasks');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.removeScheduleMeet.name)
		.setDescription(commands.removeScheduleMeet.description)
		.addStringOption(option =>
			option.setName(commands.removeScheduleMeet.options.name.name)
				.setDescription(commands.removeScheduleMeet.options.name.description)
				.setRequired(true)
				.setMinLength(2)
				.setMaxLength(20),
		),
	async execute(interaction) {
		const name = interaction.options.getString(commands.removeScheduleMeet.options.name.name);
		let response = '';

		if (tasks.has(name)) {
			const task = tasks.get(name);
			task.stop();
			tasks.delete(name);
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