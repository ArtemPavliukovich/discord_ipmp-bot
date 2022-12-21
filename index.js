require('dotenv').config();
const fs = require('node:fs');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandsFiles) {
	const command = require(`./commands/${file}`);

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
}

/* client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
}); */

client.login(token);