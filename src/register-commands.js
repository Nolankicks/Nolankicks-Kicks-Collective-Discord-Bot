require('dotenv').config();
const { REST, Routes, ApplicationCommandOption } = require('discord.js');

const commands = [
    {
        name: 'rps',
        description: 'Play a game of rock, paper, scissors!',
    },
];
const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () =>
{
    try {
        console.log('registering commands...');
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: commands }
        );
        console.log('Successfully registered application commands.');

    } catch (error) {
        console.log(error);
    }
})();