const { SlashCommandBuilder } = require('discord.js');
const cron = require('node-cron');
const { commands, messages, months } = require('../config.js');
const { schedules } = require('../schedules');
const { client } = require('../index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commands.addScheduleMeet.name)
		.setDescription(commands.addScheduleMeet.description)
		.addSubcommand(subcommand =>
			subcommand.setName(commands.addScheduleMeet.subcommand.onceMeet.name)
				.setDescription(commands.addScheduleMeet.subcommand.onceMeet.description)
				.addStringOption(option =>
					option.setName(commands.addScheduleMeet.options.name.name)
						.setDescription(commands.addScheduleMeet.options.name.description)
						.setRequired(true)
						.setMaxLength(20))
				.addStringOption(option =>
					option.setName(commands.addScheduleMeet.options.month.name)
						.setDescription(commands.addScheduleMeet.options.month.description)
						.setRequired(true)
						.addChoices(
							{name: months.january, value: months.january},
							{name: months.february, value: months.february},
							{name: months.march, value: months.march},
							{name: months.april, value: months.april},
							{name: months.may, value: months.may},
							{name: months.june, value: months.june},
							{name: months.july, value: months.july},
							{name: months.august, value: months.august},
							{name: months.september, value: months.september},
							{name: months.october, value: months.october},
							{name: months.november, value: months.november},
							{name: months.december, value: months.december},
						))
				.addIntegerOption(option =>
					option.setName(commands.addScheduleMeet.options.date.name)
						.setDescription(commands.addScheduleMeet.options.date.description)
						.setRequired(true)
						.setMinValue(1)
						.setMaxValue(31))
				.addUserOption(option =>
					option.setName(commands.addScheduleMeet.options.users.name)
						.setDescription(commands.addScheduleMeet.options.users.description)),
		)
		.addSubcommand(subcommand =>
			subcommand.setName(commands.addScheduleMeet.subcommand.repeatMeet.name)
				.setDescription(commands.addScheduleMeet.subcommand.repeatMeet.description)
				.addStringOption(option =>
					option.setName(commands.addScheduleMeet.options.name.name)
						.setDescription(commands.addScheduleMeet.options.name.description)
						.setRequired(true)
						.setMaxLength(20)),
		),
	async execute(interaction) {
		const name = interaction.options.getString(commands.addScheduleMeet.options.name.name);
		// console.log(name);
		// console.log(interaction);
		// const users = interaction.options.getString(commands.addScheduleMeet.options.users.name);
		// const date = interaction.options.getInteger(commands.addScheduleMeet.options.date.name);
		// const month = interaction.options.getString(commands.addScheduleMeet.options.month.name);
		const task = cron.schedule('* * * * *', () => {
			const channel = client.channels.cache.get(interaction.channelId);
			channel.send('привет');
		}, {scheduled: false});

		task.start();
		schedules.set(name, task);

		await interaction.reply({
			content: messages.addSchedule,
			ephemeral: true,
		});
	},
};