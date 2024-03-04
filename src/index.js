require('dotenv').config();
const { Client, IntentsBitField, cleanCodeBlockContent  } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});







function getMove() {
    const replies = ['paper', 'rock', 'scissors' ];
    const random = Math.floor(Math.random() * 3)
    
    return replies[random]
}


client.on('interactionCreate', (interaction) =>
{
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);

    if (interaction.commandName === 'rps') 
    {
        const rock = interaction.options.getBoolean('rock');
        const paper = interaction.options.getBoolean('paper');
        const scissors = interaction.options.getBoolean('scissors');
        
        if (rock && paper && scissors) {
            interaction.reply('You can only choose one option at a time!');
            return;
        }
        if (!rock && !paper && !scissors) {
            interaction.reply('You need to choose an option!');
            return;
        }
        const botMove = getMove();
        if (rock)
        {
            if (botMove === 'rock') {
                interaction.reply('I chose rock, it\'s a tie!');
            } else if (botMove === 'paper') {
                interaction.reply('I chose paper, I win!');
            } else {
                interaction.reply('I chose scissors, you win!');
            }
            return;
        }
        if (paper)
        {
            if (botMove === 'rock') {
                interaction.reply('I chose rock, you win!');
            } else if (botMove === 'paper') {
                interaction.reply('I chose paper, it\'s a tie!');
            } else {
                interaction.reply('I chose scissors, I win!');
            }
            return;
        }
        if (scissors)
        {
            if (botMove === 'rock') {
                interaction.reply('I chose rock, I win!');
            } else if (botMove === 'paper') {
                interaction.reply('I chose paper, you win!');
            } else {
                interaction.reply('I chose scissors, it\'s a tie!');
            }
            return;
        }
        if (rock && paper || rock && scissors || paper && scissors) {
            interaction.reply('You can only choose one option at a time!');
            return;
        }
        
    }

}) 


client.login(process.env.TOKEN);