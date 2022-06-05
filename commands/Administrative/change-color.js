const Discord = require('discord.js');

module.exports = {
	name: 'change-color',
	description: 'Changes the color of all embeds',
	aliases: ['change-embed-color', 'color'],
	args: true,
	usage: '{hex code}',
	permissions: 'MANAGE_GUILD',
	category: 'Administrative',
	execute(message, args) {
		if (args[0] == 'reset') {
			client.EmbedColorSelectData.set(message.guild.id, '#d9688a')
			const FinalEmbed = new Discord.MessageEmbed()
				.setColor('#d9688a')
				.setDescription(`**Embed color successfully reset**`)
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			message.channel.send({ embeds: [FinalEmbed] })
		} else {
			try {
				const test = new Discord.MessageEmbed()
					.setColor(`${args[0]}`)
					.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
			} catch {
				const error = new Discord.MessageEmbed()
					.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
					.setAuthor("Error")
					.setDescription(`Could not change the embed color to \`${args[0]}\` \nMake sure you have a valid hex code \nUse \`reset\` as hex code to reset to default`)
					.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
				return message.channel.send({ embeds: [error] })
			}
			client.EmbedColorSelectData.set(message.guild.id, `${args[0]}`)
			const FinalEmbed = new Discord.MessageEmbed()
				.setColor(`${args[0]}`)
				.setDescription(`**Embed color successfully set to \`${args[0]}\`**\nUse \`reset\` as hex code to reset to default`)
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			message.channel.send({ embeds: [FinalEmbed] })
		}
	}
}