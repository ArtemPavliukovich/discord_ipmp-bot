const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Поприветствовать IPMP-Bot'),
	async execute(interaction) {
		await interaction.reply(
			`Привет ${interaction.user.username}, меня зовут IPMP-Bot, рад знакомству`,
		);
	},
};