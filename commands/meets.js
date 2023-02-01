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
			for (let id of tasks.keys()) {
				const task = tasks.get(id);
				response += messages.infoAboutTask(task.name, task.getStringDate(), id) + '\n';
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