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
				.addRoleOption(option =>
					option.setName(commands.addScheduleMeet.options.roles.name)
						.setDescription(commands.addScheduleMeet.options.roles.description))
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
		let task;
		const name = interaction.options.getString(commands.addScheduleMeet.options.name.name);
		const month = interaction.options.getString(commands.addScheduleMeet.options.month.name);
		const date = interaction.options.getInteger(commands.addScheduleMeet.options.date.name);
		const hour = interaction.options.getInteger(commands.addScheduleMeet.options.hour.name);
		const minute = interaction.options.getInteger(commands.addScheduleMeet.options.minute.name);
		const users = interaction.options.getUser(commands.addScheduleMeet.options.users.name);
		const roles = interaction.options.getRole(commands.addScheduleMeet.options.roles.name);
		console.log(date);
		console.log(hour);
		console.log(minute);
		console.log(users);
		console.log(roles);
		// console.log(interaction);
		if (month) {
			task = cron.schedule('* * * * *', () => {
				const channel = client.channels.cache.get(interaction.channelId);
				channel.send('привет');
				task.stop();
				schedules.delete(name);
			}, {scheduled: false});
		} else {
			console.log('in develop');
		}

		task.start();
		schedules.set(name, task);

		await interaction.reply({
			content: messages.addSchedule,
			ephemeral: true,
		});
	},
};