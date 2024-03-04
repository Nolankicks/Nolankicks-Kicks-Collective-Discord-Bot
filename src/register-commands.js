require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'rps',
        description: 'Play a game of rock, paper, scissors!',
        options: [
            {
            name: 'rock',
            description: 'Choose rock',
            type: ApplicationCommandOptionType.Boolean,
            },
            {
            name: 'paper',
            description: 'Choose paper',
            type: ApplicationCommandOptionType.Boolean,
            },
            {
            name: 'scissors',
            description: 'Choose scissors',
            type: ApplicationCommandOptionType.Boolean,
            },
            {
                name: 'bet',
                description: 'Bet an amount of coins',
                type: ApplicationCommandOptionType.Integer,
                required: true,
            }
        ]
    },
    {
        name: 'balance',
        description: 'Check your balance',
        
    }
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