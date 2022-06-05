const Discord = require('discord.js');
module.exports = {
	name: 'avatar',
	description: 'Gets a users avatar',
	aliases: ['av', 'pfp', 'icon'],
	category: 'Utility',
	execute(message, args) {
		if (!message.mentions.users.first()) {
	
			const userAvatarEmbed = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setImage(`${message.author.displayAvatarURL({ format: 'png', dynamic: true }) }`)
				.setDescription(`${message.author}'s Avatar`)
			message.channel.send({ embeds: [userAvatarEmbed] })
		} else {
			let user = message.mentions.users.first() 
			if (!user) {return message.channel.send("Invalid user")}
			const userAvatarEmbed = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setImage(`${user.displayAvatarURL({ format: 'png', dynamic: true })}`)
				.setDescription(`${message.mentions.users.first()}'s Avatar`)
			message.channel.send({ embeds: [userAvatarEmbed] })
		

		}
	}
}