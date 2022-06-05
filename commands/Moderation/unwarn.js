let Discord = require('discord.js')

module.exports = {
	name: 'unwarn',
	args: true,
	usage: '{user} {warn}',
	aliases: ['uw'],
	description: 'Unwarns a user',
	category: 'Moderation',
	execute(message, args) {
		if (!message.member.roles.cache.has((client.StaffRoleData.get(message.guild.id)))) return message.reply('```Error: Not Staff```')

		let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!member) return message.reply("```Error: Invlid Member```")
	

		if (!args[1]) return message.reply("```Error: Invalid Arguments```")
		if (isNaN(args[1])) return message.reply("```Error: Invalid Arguments```")

		if (!client.WarnedMembersData.has(member.id)) return message.reply("User has not been warned!")

		let array = client.WarnedMemberReasons.get(member.id)
		if (args[1] < 0) return message.reply("```Error: Invalid Number```")
		if (args[1] > array.length) return message.reply("```Error: Invalid Number```")

		client.WarnedMembersData.dec(member.id)
		array.splice((args[1] - 1), 1)
		client.WarnedMemberReasons.delete(member.id)
		client.WarnedMemberReasons.set(member.id, array)

		let warnList = []
		for (let i = 0; i < array.length; i++) {
			warnList.push(`**[${i + 1}]** ${array[i]}`)
		}

			let BanEmbed = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('Alert')
				.setDescription(`<@${member.id}> was successfully unwarned\n\n**Current User Warns**\n${(warnList.join('\n')) || ('```USER HAS NO WARNS```')}`)
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		member.send(`You were unwarned!`).catch(() => { message.channel.send("Error: could not DM user") });
			message.channel.send({ embeds: [BanEmbed] })


	}
}