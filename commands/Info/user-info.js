const Discord = require('discord.js');
let ms = require('pretty-ms')

module.exports = {
	name: 'user-info',
	description: 'Gets information about a certain user',
	category: 'Information',
	aliases: ['info', 'whois', 'member-info'],
	execute(message, args,) {
		let CacheError = []
		let user = message.mentions.users.first() || client.users.cache.get(args[0])
		if (!user) {
			if (args[0]) {
				CacheError = true
			}
			user = message.author
        }

		//let UserFlags = No idea what this is for

		let GuildUser = message.guild.members.cache.get(user.id)
		if (!GuildUser) {

			let UserInfo = []
			if (user.system) {
				UserInfo.push("[SYSTEM]")
			} else if (user.bot) {
				if (user.flags.has('VERIFIED_BOT')) {
					UserInfo.push("[VERIFIED BOT]")
				} else {
					UserInfo.push("[BOT]")
				}
			}


			let embed = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle(`${user.tag} ${UserInfo}`)
				.setDescription(`**User ID:** ${user.id}\n`)
				.setThumbnail(`${user.displayAvatarURL({ format: 'png', dynamic: true })}`)
				.addFields(
					{ name: "Registered", value: `\`\`\`${user.createdAt}\`\`\``, inline: true },
			)
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671')
			message.channel.send({ embeds: [embed] })
		} else {

			let RoleListPrimary = GuildUser.roles.cache.filter(role => role.name !== '@everyone')
			let RoleList = []
			RoleListPrimary.forEach(role => { RoleList.push(`${role}`) })

			let TimeoutStatus = []
			if (GuildUser.communicationDisabledUntil) {
				TimeoutStatus.push(`Muted Until: <t:${Math.floor(Number(GuildUser.communicationDisabledUntilTimestamp / 1000))}>\n** **`)
			} else {
				TimeoutStatus = '\`Not Timed Out\`'
			}

			let BoostStatus = []
			if (GuildUser.premiumSinceTimestamp) {
				BoostStatus = ms(Math.floor(Number(GuildUser.premiumSinceTimestamp)) / 1000)
			} else {
				BoostStatus = 'Not Boosting'
			}

			let BotStatus = []
			if (client.WarnedMembersData.has(user.id)) {
				BotStatus.push(`**User Warned**\n\`[PENDING WARN REWRITE]\``)
			}
			if (client.MutedMembersData.has(user.id)) {
				BotStatus.push(`**User Muted** \n\`[PENDING MUTE REWRITE]\``)
			}
			if (BotStatus.length == 0) {
				BotStatus.push(`\`Not Warned or Muted\``)
			}

			let UserInfo = []
			if (user.system) {
				UserInfo.push("[SYSTEM]")
			} else if (user.bot) {
				if (user.flags.has('VERIFIED_BOT')) {
					UserInfo.push("[VERIFIED BOT]")
				} else {
					UserInfo.push("[BOT]")
				}
			}

			let UserPresence = []
			try {
				UserPresence = GuildUser.presence.status
				if (UserPresence == 'online') {
					UserPresence = 'Online'
				} else if (UserPresence == 'dnd') {
					UserPresence = 'Do Not Disturb'
				} else if (UserPresence == 'idle') {
					UserPresence = 'Idle'
				} else {
					return message.channel.send("```Error: Could not detect presence```")
				}

			} catch {
				UserPresence = 'Offline'
			} finally {
				let embed = new Discord.MessageEmbed()
					.setColor(`${GuildUser.displayHexColor}`)
					.setTitle(`${UserInfo} ${GuildUser.displayName}`)
					.setDescription(`**Color:** ${GuildUser.displayHexColor}\n**User ID:** ${user.id}\n**Status:** ${UserPresence}\n**Boosting:** ${BoostStatus}`)
					.setThumbnail(`${user.displayAvatarURL({ format: 'png', dynamic: true })}`)
					.addFields(
						{ name: "Registered", value: `\`\`\`${user.createdAt}\`\`\``, inline: true },
						{ name: "Joined", value: `\`\`\`${GuildUser.joinedAt}\`\`\``, inline: true },
						{ name: "SERVER INFORMATION", value: `${TimeoutStatus}` },
						{ name: `Roles [${(GuildUser.roles.cache.size) - 1}]`, value: `${RoleList.join(' ')}` }
					)
					.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671')


				if (GuildUser.displayName + '#' + user.discriminator !== user.tag) {
					embed.setAuthor(`${user.tag}`)
				}
				if (CacheError == true) {
					let embed2 = new Discord.MessageEmbed()
						.setColor(`${GuildUser.displayHexColor}`)
						.setDescription(`Unable to cache user \`${args[0]}\`, please try again`)
					message.channel.send({ embeds: [embed2] })
				} else {
					message.channel.send({ embeds: [embed] })
                }
			}
		}
	}
}