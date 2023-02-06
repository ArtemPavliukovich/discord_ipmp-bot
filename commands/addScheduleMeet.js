const { SlashCommandBuilder } = require('discord.js');
const { v4: uuidv4 } = require('uuid');
const { commands, messages, months, days, channelForMessagesAboutMeeting } = require('../config.js');
const { client } = require('../index');
const { database } = require('../libs/classes/database');
const Task = require('../libs/classes/task');

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
						.setMinLength(2)
						.setMaxLength(20))
				.addStringOption(option =>
					option.setName(commands.addScheduleMeet.options.month.name)
						.setDescription(commands.addScheduleMeet.options.month.description)
						.setRequired(true)
						.addChoices(
							{name: months.january, value: months.january.toLowerCase()},
							{name: months.february, value: months.february.toLowerCase()},
							{name: months.march, value: months.march.toLowerCase()},
							{name: months.april, value: months.april.toLowerCase()},
							{name: months.may, value: months.may.toLowerCase()},
							{name: months.june, value: months.june.toLowerCase()},
							{name: months.july, value: months.july.toLowerCase()},
							{name: months.august, value: months.august.toLowerCase()},
							{name: months.september, value: months.september.toLowerCase()},
							{name: months.october, value: months.october.toLowerCase()},
							{name: months.november, value: months.november.toLowerCase()},
							{name: months.december, value: months.december.toLowerCase()},
						))
				.addIntegerOption(option =>
					option.setName(commands.addScheduleMeet.options.date.name)
						.setDescription(commands.addScheduleMeet.options.date.description)
						.setRequired(true)
						.setMinValue(1)
						.setMaxValue(31))
				.addIntegerOption(option =>
					option.setName(commands.addScheduleMeet.options.hour.name)
						.setDescription(commands.addScheduleMeet.options.hour.description)
						.setRequired(true)
						.setMinValue(0)
						.setMaxValue(23))
				.addIntegerOption(option =>
					option.setName(commands.addScheduleMeet.options.minute.name)
						.setDescription(commands.addScheduleMeet.options.minute.description)
						.setRequired(true)
						.setMinValue(0)
						.setMaxValue(59))
				.addStringOption(option =>
					option.setName(commands.addScheduleMeet.options.users.name)
						.setDescription(commands.addScheduleMeet.options.users.description)
						.setRequired(true)),
		)
		.addSubcommand(subcommand =>
			subcommand.setName(commands.addScheduleMeet.subcommand.repeatMeet.name)
				.setDescription(commands.addScheduleMeet.subcommand.repeatMeet.description)
				.addStringOption(option =>
					option.setName(commands.addScheduleMeet.options.name.name)
						.setDescription(commands.addScheduleMeet.options.name.description)
						.setRequired(true)
						.setMinLength(2)
						.setMaxLength(20))
				.addStringOption(option =>
					option.setName(commands.addScheduleMeet.options.day.name)
						.setDescription(commands.addScheduleMeet.options.day.description)
						.setRequired(true)
						.addChoices(
							{name: days.monday, value: days.monday.toLowerCase()},
							{name: days.tuesday, value: days.tuesday.toLowerCase()},
							{name: days.wednesday, value: days.wednesday.toLowerCase()},
							{name: days.thursday, value: days.thursday.toLowerCase()},
							{name: days.friday, value: days.friday.toLowerCase()},
							{name: days.saturday, value: days.saturday.toLowerCase()},
							{name: days.sunday, value: days.sunday.toLowerCase()},
						))
				.addIntegerOption(option =>
					option.setName(commands.addScheduleMeet.options.hour.name)
						.setDescription(commands.addScheduleMeet.options.hour.description)
						.setRequired(true)
						.setMinValue(0)
						.setMaxValue(23))
				.addIntegerOption(option =>
					option.setName(commands.addScheduleMeet.options.minute.name)
						.setDescription(commands.addScheduleMeet.options.minute.description)
						.setRequired(true)
						.setMinValue(0)
						.setMaxValue(59))
				.addStringOption(option =>
					option.setName(commands.addScheduleMeet.options.users.name)
						.setDescription(commands.addScheduleMeet.options.users.description)
						.setRequired(true)),
		),
	async execute(interaction) {
		let responseMessage;

		const task = new Task(
			uuidv4(),
			interaction.options.getString(commands.addScheduleMeet.options.name.name),
			interaction.options.getString(commands.addScheduleMeet.options.month.name),
			interaction.options.getString(commands.addScheduleMeet.options.day.name),
			interaction.options.getInteger(commands.addScheduleMeet.options.date.name),
			interaction.options.getInteger(commands.addScheduleMeet.options.hour.name),
			interaction.options.getInteger(commands.addScheduleMeet.options.minute.name),
			interaction.options.getString(commands.addScheduleMeet.options.users.name),
			channelForMessagesAboutMeeting,
			interaction.guildId,
			new Date().getFullYear(),
		);

		if (task.checkTimeForStartTask()) {
			if (task.checkDateInMonth()) {
				const isDone = await database.addTask(task);

				if (isDone) {
					const channel = client.channels.cache.get(task.channelId);
					channel.send(messages.plannedMeet(interaction.user.id, task.name, task.users, task.getStringDate()));
					responseMessage = messages.addSchedule;
				} else {
					responseMessage = messages.errorAdd;
				}
			} else {
				responseMessage = messages.notDate;
			}
		} else {
			responseMessage = messages.errorOnceMeet;
		}

		await interaction.reply({
			content: responseMessage,
			ephemeral: true,
		});
	},
};