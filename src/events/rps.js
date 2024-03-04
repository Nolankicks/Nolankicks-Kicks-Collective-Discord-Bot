const { Clent,  } = require('discord.js');

module.exports["RPS"] = (Client) => 
{
    const client = Client;

    function getMove() {
        const replies = ['paper', 'rock', 'scissors' ];
        const random = Math.floor(Math.random() * 3)
        
        return replies[random]
    }
    
    
    client.on('interactionCreate', (interaction) =>
    {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.channelId != process.env.CHANNEL_ID)
        {
            interaction.reply(
                {
                    content: `You can only use this command in the ${`https://discord.com/channels/@me/${process.env.CHANNEL_ID}`} channel!`,
                    ephemeral: true
                }
            );
            return;
    
        }
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
}