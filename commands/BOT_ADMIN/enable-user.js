const Discord = require('discord.js');

module.exports = {
	name: 'enable-user',
	description: 'Removes a user from disabled member database \nOnly available for bot staff',
	category: 'BOT_ADMIN',
	execute(message, args) {
		let MemberCheck = false

		let array = client.BotSettings.get('BOT_ADMINS')

		array.forEach(item => {

			if (item == `<@${message.author.id}> - ${message.author.tag}`) {
				MemberCheck = true
			} else {
				if (message.author.id == '560127223416225794') {
					MemberCheck = true
				}
			}

		})

		if (MemberCheck == false) return message.channel.send("`Error: Not bot staff`")

			client.DisabledMemberData.delete(args[0])
			const DatabaseEmbed = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('Success')
				.setDescription(`<@${args[0]}> was re-enabeld`)
			message.channel.send({ embeds: [DatabaseEmbed] })
	}
}