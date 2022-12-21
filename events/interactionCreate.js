const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) {
			return;
		}

		const command = interaction.client.commands.get(interaction.commandName);

		if (command) {
			try {
				await command.execute(interaction);
			}
			catch (error) {
				await interaction.reply({
					content: 'При выполнении этой команды произошла ошибка',
					ephemeral: true,
				});
			}
		}
	},
};