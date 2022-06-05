const Discord = require('discord.js');

module.exports = {
	name: 'delete-afk-message',
	description: 'Removes a user\'s AFK status',
	args: true,
	usage: '{user}',
	category: 'Moderation',
	aliases: ['remove-afk', 'delete-afk'],
	execute(message, args) {
		let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!member) return message.channel.send("```Error: Invalid Member```")
		if (client.afkUsers.has(member.id)) {
			const embed = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setDescription(`**Successfully removed <@${member.id}> from afk`)
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			client.afkUsers.delete(member.id)
			message.channel.send({embeds: [embed]})
        }
	}
}
