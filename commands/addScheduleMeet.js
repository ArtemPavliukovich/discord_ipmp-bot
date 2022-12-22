const { SlashCommandBuilder } = require('discord.js');
const cron = require('node-cron');
const { commands } = require('../config.js');
const { schedules } = require('../schedules');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.addScheduleMeet.name)
		.setDescription(commands.addScheduleMeet.description),
	async execute(interaction) {
		//const timer = cron.schedule()
	},
};