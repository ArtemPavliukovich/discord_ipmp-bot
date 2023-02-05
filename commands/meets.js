const { SlashCommandBuilder } = require('discord.js');
const { commands, messages } = require('../config.js');
const { database } = require('../libs/classes/database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.meets.name)
		.setDescription(commands.meets.description),
	async execute(interaction) {
		let response = '';
		const tasks = database.getTasks();

		if (tasks.size) {
			for (let task of tasks.values()) {
				if (!task.task) {
					await database.removeTask(task.id);
					continue;
				}

				response += messages.infoAboutTask(task.name, task.getStringDate(), task.id) + '\n';
			}
		}

		if (!response) {
			response = messages.notMeets;
		}

		await interaction.reply({
			content: response,
			ephemeral: true,
		});
	},
};