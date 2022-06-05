const Discord = require('discord.js')
module.exports = {
	name: 'invite',
	description: 'Shows bot invite link',
	category: 'Utility',
	execute(message, args) {
		const Invite = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle('Error')
			.setDescription('Developmental testing bot, not for public use')
			.setFooter('Number Fifteen: The Bot  |  DEV Testing Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
		message.channel.send({ embeds: [Invite] });
	}
}

	