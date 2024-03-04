const { Client } = require('discord.js');

module.exports["Logger"] = (Client) => 
{
    const client = Client;

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
}