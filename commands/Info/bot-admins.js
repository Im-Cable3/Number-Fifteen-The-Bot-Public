const Discord = require('discord.js');

module.exports = {
	name: 'bot-admins',
	aliases: ['bot-staff'],
	description: 'Displays the bot\'s staff',
	category: 'Information',
	execute(message, args) {
		let AdminList = []
		if (client.BotSettings.has('BOT_ADMINS')) {
			AdminList = client.BotSettings.get('BOT_ADMINS').join('\n')
		} else {
			if (client.BotSettings.get('BOT_ADMINS').length == 0) {
				AdminList = "```NO BOT ADMINS FOUND```"
			}
			AdminList = "```NO BOT ADMINS FOUND```"
		}

		const AdminEmbed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setAuthor('Number Fifteen: The Bot')
			.setTitle("Bot Admins")
			.setDescription(`<@560127223416225794> - ${client.users.cache.get('560127223416225794').tag} **[BOT OWNER]**\n${AdminList}`)
			.setFooter('Number Fifteen: The Bot  |  BOT ADMINS', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		message.channel.send({embeds: [AdminEmbed]})
	}
}