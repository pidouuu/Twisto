const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')

module.exports = async (client, interaction) => {

  if(interaction.isCommand()) {
    let comando = client.slashCommands.get(interaction.commandName)
    comando.run(MessageEmbed, client, interaction)
  }
  
}