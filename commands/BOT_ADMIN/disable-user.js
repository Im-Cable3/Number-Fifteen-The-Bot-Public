const Discord = require('discord.js');

module.exports = {
	name: 'disable-user',
	description: 'Adds a user from disabled member database \nOnly available for bot staff',
	category: 'BOT_ADMIN',
	args: true,
	usage: "{user}",
	execute(message, args) {
		let MemberCheck = false

		let array = client.BotSettings.get('BOT_ADMINS')

		array.forEach(item => {

			if (item == `<@${ message.author.id }> - ${ message.author.tag }`) {
				MemberCheck = true
			} else {
				if (message.author.id == '560127223416225794') {
					MemberCheck = true
                }
            }

		})

		if (MemberCheck == false) return message.channel.send("`Error: Not bot staff`")

			client.DisabledMemberData.set(args[0], true)
			const DatabaseEmbed = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('Success')
				.setDescription(`<@${args[0]}> was disabled`)
			message.channel.send({ embeds: [DatabaseEmbed] })
	}
}