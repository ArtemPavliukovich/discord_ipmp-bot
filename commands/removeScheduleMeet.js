const { SlashCommandBuilder } = require('discord.js');
const { commands, messages } = require('../config.js');
const { database } = require('../libs/classes/database');
const { client } = require('../index');

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
		const tasks = database.getTasks();
		const id = interaction.options.getString(commands.removeScheduleMeet.options.id.name).trim();

		if (tasks.has(id)) {
			const task = tasks.get(id);
			const isDone = await database.removeTask(id);

			if (isDone) {
				const channel = client.channels.cache.get(task.channelId);
				channel.send(messages.removeMeet(interaction.user.id, task.name, task.getStringDate()));
				responseMessage = messages.removeSchedule;
			} else {
				responseMessage = messages.errorRemove;
			}
		} else {
			responseMessage = messages.notExistMeet;
		}

		await interaction.reply({
			content: responseMessage,
			ephemeral: true,
		});
	},
};