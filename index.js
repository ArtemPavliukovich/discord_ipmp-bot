require('dotenv').config();
const fs = require('node:fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = process.env;

const client = new Client({intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
]});

module.exports = { client };

client.commands = new Collection();

const commandsFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventsFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandsFiles) {
	const command = require(`./commands/${file}`);

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
}

for (const file of eventsFiles) {
	const event = require(`./events/${file}`);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);
