require('dotenv').config();
const fs = require('node:fs');
const { REST, Routes } = require('discord.js');
const { token, clientId } = process.env;

const commands = [];

const commandsFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandsFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		await rest.put(Routes.applicationCommands(clientId), { body: commands });
		console.log('Successfully reloaded application commands.');
	}
	catch (error) {
		console.error(error);
	}
})();