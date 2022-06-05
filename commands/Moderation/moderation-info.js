let Discord = require('discord.js')

module.exports = {
	name: 'moderation-info',
	args: true,
	usage: '{user}',
	aliases: ['mi', 'mod-info'],
	description: 'Shows a user\'s warns and mutes',
	category: 'Moderation',
	execute(message, args) {

		const { Localprefix } = require('../../voximus.js');

		let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply("```Error: Invalid Member```")

		let warnList = []

		if (member.communicationDisabledUntil) {
			warnList.push(`**Muted Until:** <t:${Math.floor(Number(member.communicationDisabledUntilTimestamp / 1000))}>\n** **`)
        }

		let array = client.WarnedMemberReasons.get(member.id)

		if (array.length !== 0) {

			for (let i = 0; i < array.length; i++) {
				warnList.push(`**[${i + 1}]** ${array[i]}`)
            }
		} else {
			warnList.push("```User has no warns```")
        }

		let embed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle(`${member.displayName}'s Warns`)
			.setDescription(`${warnList.join('\n')}`)
			.setFooter(`Use ${Localprefix}unwarn to remove`, "https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671")
			.setThumbnail(`${member.displayAvatarURL({ format: 'png', dynamic: true })}`)

		message.channel.send({embeds: [embed]})
	}
}