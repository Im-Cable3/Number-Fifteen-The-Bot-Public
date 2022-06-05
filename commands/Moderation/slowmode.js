const Discord = require('discord.js');
const ms = require("ms"); // https:// www.npmjs.com/package/ms

module.exports = {
	name: "slowmode",
	description: "Sets slowmode in a channel",
	aliases: ["sm" , "interval"],
	category: 'Moderation',
	execute(message, args) {

		if (!message.member.roles.cache.has((client.StaffRoleData.get(message.guild.id)))) return message.reply('```Error: Not Staff```')

		let ratelimit = message.channel.rateLimitPerUser * 1000
		const Current_Slowmode = ms(ratelimit, { long: true })
		if (ratelimit == 0) {
			ratelimit = '0'
        }

		const SlowmodeRemoved = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setDescription('**Slowmode Removed**')
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		const CurrentSlowmode = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setDescription(`Current slowmode is ${Current_Slowmode}`)
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		const SlowmodeError1 = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle('Error')
			.setDescription('Slowmode must be less than 6 hours')
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		const SlowmodeError2 = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle('Error')
			.setDescription('Invalid Slowmode')
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		try {
			if (!args[0]) return message.channel.send({ embeds: [CurrentSlowmode] })
			let time_interval = []
			try {
				time_interval = ms(args[0])
			} catch {
				time_interval = args[0]
			} finally {
				let slowmode_interval = (time_interval / 1000)
				let interval_to_send = ms(time_interval, { long: true })
				if (time_interval > 21600000) return message.channel.send({ embeds: [SlowmodeError1] })
				if (time_interval < 1000) (slowmode_interval = args[0]) && (interval_to_send = (`${args[0]} seconds`))

				if (args[0] == 0) return message.channel.send({ embeds: [SlowmodeRemoved] }) && message.channel.setRateLimitPerUser(0)

				const SlowmodeSuccess = new Discord.MessageEmbed()
					.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
					.setDescription(`Slowmode successfully set to ${interval_to_send}`)
					.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

				message.channel.setRateLimitPerUser(slowmode_interval)
				message.channel.send({ embeds: [SlowmodeSuccess] })
			}
		} catch {
			message.channel.send({ embeds: [SlowmodeError2] })
		};
	}
};