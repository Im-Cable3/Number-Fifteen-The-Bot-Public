const Discord = require('discord.js');

module.exports = {
	name: 'add-bot-admin',
	aliases: ['add-admin'],
	description: 'Adds a bot admin',
	category: 'BOT_OWNER',
	args: true,
	usage: '{user}',
	execute(message, args) {
		let user = client.users.cache.get(args[0])
		if (!user) {
			return message.channel.send(`\`\`\`Error: Could not find member ${args[0]}\`\`\``)
		}
		if (client.BotSettings.has('BOT_ADMINS')) {
			if (client.BotSettings.get('BOT_ADMINS').indexOf(`<@${user.id}> - ${user.tag}`) !== -1) {
				return message.channel.send(`\`\`\`Error: User is already a bot admin\`\`\``)
			}
		} else {
			client.BotSettings.set('BOT_ADMINS', [])
        }
		if (user.id == '560127223416225794') {
			return message.channel.send(`\`\`\`Error: User is already bot owner\`\`\``)
        }
		client.BotSettings.push('BOT_ADMINS', `<@${user.id}> - ${user.tag}`)

		const embed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setDescription(`<@${user.id}> was successfully added to bot admin list`)
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		message.channel.send({embeds: [embed]})
	}
}