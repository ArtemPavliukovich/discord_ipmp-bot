const { SlashCommandBuilder } = require('discord.js');
const cron = require('node-cron');
const { commands, messages } = require('../config.js');
const { schedules } = require('../schedules');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.addScheduleMeet.name)
		.setDescription(commands.addScheduleMeet.description)
		.addStringOption(option =>
			option.setName(commands.addScheduleMeet.options.name.name)
				.setDescription(commands.addScheduleMeet.options.name.description)
				.setRequired(true)
				.setMaxLength(20),
		),
	async execute(interaction) {
		const name = interaction.options.getString(commands.addScheduleMeet.options.name.name);
		const schedule = null;
		//const timer = cron.schedule()
		schedules.set(name, schedule);

		await interaction.reply({
			content: messages.addSchedule,
			ephemeral: true,
		});
	},
};