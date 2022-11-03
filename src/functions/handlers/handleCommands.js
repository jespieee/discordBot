const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandFiles = fs
            .readdirSync(`./src/commands/`)
            .filter((file) => file.endsWith('.js'));

        for (const file of commandFiles) {
            const { commands, commandArray } = client;
            const command = require(`../../commands/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command: ${command.data.name} has been registered`);
        }

        const clientId = '1031634305736257670';
        const guildId = '376185265137385483';
        const rest = new REST({ version: '9'}).setToken(process.env.TOKEN);
        try {
            console.log("Started refreshing application (/) commands.");

            await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                body: client.commandArray,
            });

            console.log("Successfully reloaded application (/) commands.");
        } catch (error) {
            console.error(error);
        }
    };
};