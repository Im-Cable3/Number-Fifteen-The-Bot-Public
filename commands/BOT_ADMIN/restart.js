const Discord = require('discord.js')

module.exports = {
	name: 'restart',
	description: 'Restarts the bot \nOnly available for bot staff',
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

			const one = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('RESTARTING IN 10 SECONDS')
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			const two = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('RESTARTING IN 9 SECONDS')
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			const three = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('RESTARTING IN 8 SECONDS')
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			const four = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('RESTARTING IN 7 SECONDS')
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			const five = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('RESTARTING IN 6 SECONDS')
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			const six = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('RESTARTING IN 5 SECONDS')
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			const seven = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('RESTARTING IN 4 SECONDS')
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			const eight = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('RESTARTING IN 3 SECONDS')
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			const nine = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('RESTARTING IN 2 SECONDS')
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			const ten = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('RESTARTING IN 1 SECOND')
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			const success = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('✅ RESTARTING NOW')
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			let sent = message.channel.send({ embeds: [one] }).then((sent) => {
				setTimeout(() => {
					sent.edit({ embeds: [two] })
					setTimeout(() => {
						sent.edit({ embeds: [three] })
						setTimeout(() => {
							sent.edit({ embeds: [four] })
							setTimeout(() => {
								sent.edit({ embeds: [five] })
								setTimeout(() => {
									sent.edit({ embeds: [six] })
									setTimeout(() => {
										sent.edit({ embeds: [seven] })
										setTimeout(() => {
											sent.edit({ embeds: [eight] })
											setTimeout(() => {
												sent.edit({ embeds: [nine] })
												setTimeout(() => {
													sent.edit({ embeds: [ten] })
													setTimeout(() => {
														sent.edit({ embeds: [success] })
														setTimeout(() => {
															process.exit()
														}, 1000)
													}, 1000)
												}, 1000)
											}, 1000)
										}, 1000)
									}, 1000)
								}, 1000)
							}, 1000)
						}, 1000)
					}, 1000)
				}, 1000)
			})
	}
}