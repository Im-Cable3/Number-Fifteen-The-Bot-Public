const Discord = require('discord.js')
module.exports = {
    name: 'ping',
    description: 'Shows bots ping',
    category: 'Utility',
  execute(message, args) {
    const API_Latency = message.client.ws.ping
    const test = new Discord.MessageEmbed()
      .setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
      .setTitle('Pinging...')
      .setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
    message.channel.send({ embeds: [test] }).then(sent => {
      const ping = new Discord.MessageEmbed()
        .setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
        .setTitle ('Pong!')
        .setDescription(`API Latency: \n\`\`\`${API_Latency}ms\`\`\`\nResponse Time: \n\`\`\`${sent.createdTimestamp - message.createdTimestamp}ms\`\`\``)
        .setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
      sent.edit({ embeds: [ping] } )
    })
    }
}