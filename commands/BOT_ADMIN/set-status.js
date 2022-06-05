const Discord = require('discord.js')

module.exports = {
	name: 'set-status',
	description: 'Changes the bots status \nOnly available for bot staff',
	category: 'BOT_ADMIN',
	args: true,
	usage: '{satus}',

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

			let Status = args.join(' ')

			try {
				client.user.setActivity(`${Status}`, { type: "PLAYING" })

				const Success = new Discord.MessageEmbed()
					.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
					.setTitle('Status Changed')
					.setDescription(`Status was successfulyl changed to ${Status}`)
					.setFooter('Number Fifteen: The Bot  |  Requires bot staff', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
				message.channel.send({ embeds: [Success] });
			} catch {
				message.channel.send('`Error Setting Status`')
			}
	}
}