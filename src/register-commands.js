require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'rps',
        description: 'Play a game of rock, paper, scissors!',
        options: [
            {
                name: 'bet',
                description: 'Bet an amount of coins',
                type: ApplicationCommandOptionType.Integer,
                required: true,
            },
        ],
    },
    {
        name: 'balance',
        description: 'Check your balance',
    },
    {
        name: 'give',
        description: 'Give coins to another user',
        options: [
            {
                name: 'user',
                description: 'The user you are giving coins to',
                type: ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: 'amount',
                description: 'The amount of coins you are giving',
                type: ApplicationCommandOptionType.Integer,
                required: true,
            }
        ]
    },
    {
        name: 'leaderboard',
        description: 'Check the top 10 users with the most coins',
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