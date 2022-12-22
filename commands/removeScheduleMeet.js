const { SlashCommandBuilder } = require('discord.js');
const { commands } = require('../config.js');
const { schedules } = require('../schedules');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.removeScheduleMeet.name)
		.setDescription(commands.removeScheduleMeet.description)
		.addStringOption(option => {
			option.setName(commands.removeScheduleMeet.options.name.name)
				.setDescription(commands.removeScheduleMeet.options.name.description)
				.setRequired(true)
				.addChoices({
					name: schedules[0].name,
					value: schedules[0].name,
				})
				.addChoices({
					name: 'fgfg',
					value: 'fgfg',
				});

			return option;
		}),
	async execute(interaction) {
    // если это произошло и нет встреч, тог написать что нет встреч для удаления.
		console.log('yes');
		// const timer = cron.schedule()
	},
};