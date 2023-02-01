const { SlashCommandBuilder } = require('discord.js');
const { commands, messages } = require('../config.js');
const { tasks } = require('../tasks');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.removeScheduleMeet.name)
		.setDescription(commands.removeScheduleMeet.description)
		.addStringOption(option =>
			option.setName(commands.removeScheduleMeet.options.id.name)
				.setDescription(commands.removeScheduleMeet.options.id.description)
				.setRequired(true),
		),
	async execute(interaction) {
		let responseMessage = '';
		const id = interaction.options.getString(commands.removeScheduleMeet.options.id.name).trim();

		if (tasks.has(id)) {
			const task = tasks.get(id);
			task.stop();
			// удаление из бд
			tasks.delete(id);
			responseMessage = messages.removeSchedule;
		} else {
			responseMessage = messages.notExistMeet;
		}

		await interaction.reply({
			content: responseMessage,
			ephemeral: true,
		});
	},
};