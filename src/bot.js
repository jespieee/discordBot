require("dotenv").config(); // starts process from .env file
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require('fs');

const client = new Client({ intents:GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];

const functionfolders = fs.readdirSync(`./src/functions`);
for (const folder of functionfolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith('.js'));
    for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
    }
}

client.handleEvents();
client.handleCommands();
client.login(process.env.TOKEN);