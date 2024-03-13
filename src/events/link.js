const {Client, Interaction} = require('discord.js');
const Coin = require('./kicksCoinSchema.js');
module.exports["Link"] = async (Client) =>
{
    const client = Client;
    try {
        client.on('interactionCreate', async (interaction) => {
            if (interaction.commandName === 'link')
            {
                const query = {
                    userID: interaction.user.id,
                    guildID: interaction.guild.id,
                };
                const user = await Coin.findOne(query);
                if (user)
                {

                        messageSteamId = interaction.options.getString('steamid');
                        if (messageSteamId === null || messageSteamId === undefined)
                        {
                            interaction.reply('Please provide a valid steam id!');
                            return;
                        }
                        else
                        {
                           interaction.reply('Your account has been linked!');
                           user.steamid = messageSteamId;
                            await user.save();
                        }
                        
                }
                else
                {
                    const newUser = new Coin({
                        userID: interaction.user.id,
                        guildID: interaction.guild.id,
                        steamid: interaction.options.getString('steamid'),
                        coins: 20,
                    });
                    await newUser.save();
                    interaction.reply('Your account has been linked!');
                    return;
                }
            }
            
        });
    } catch (error) {
        
    }
    
}