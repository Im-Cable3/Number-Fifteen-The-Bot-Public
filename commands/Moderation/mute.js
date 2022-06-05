const Discord = require('discord.js');
const dayjs = require('dayjs')
const ms = require('ms')

module.exports = {
	name: 'mute',
	args: true,
	usage: '{user} {time} [reason]',
	aliases: ['m', 'timeout'],
	description: 'Mutes a user',
	permissions: 'MODERATE_MEMBERS',
	category: 'Moderation',
	execute(message, args) {

		message.guild.members.fetch()

		if (!message.member.roles.cache.has((client.StaffRoleData.get(message.guild.id)))) return message.reply('```Error: Not Staff```')

		let member = message.mentions.members.first() || message.guild.members.cache(args[0]);
		if (!member) return message.channel.send("`Error: Invalid Member`");

		if (member.isCommunicationDisabled()) return message.reply("```Error: User is already muted```")

		if (args[1] == null) {
			return message.channel.send("`Erorr: Invalid time specified`")
		}
		try {
			var MuteTimer = ms(args[1])
		} catch {
			return message.channel.send("`Error: Invalid time specified`")
		}
		if (args[1] < 1000) {
			(MuteTimer = args[1] * 60000)
		}
		let MuteReason = args.slice(2).join(' ');
		if (!MuteReason) MuteReason = ('No Reason Provided');

		try {

		member.timeout(Number(MuteTimer))
		client.MutedMembersData.set(member.id, true)

				const SuccessEmbed = new Discord.MessageEmbed()
					.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
					.setTitle('Successfully Muted')
					.setDescription(`Muted <@${member.id}> until <t:${dayjs().unix() + (MuteTimer / 1000)}> for: ${MuteReason}`)
					.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

				const DMMuteEmbed = new Discord.MessageEmbed()
					.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
					.setTitle('Mute Alert')
					.setDescription(`You were muted in ${message.guild.name} until <t:${dayjs().unix() + (MuteTimer / 1000)}> for: ${MuteReason}`)
					.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

				message.channel.send({ embeds: [SuccessEmbed] })
		member.send({ embeds: [DMMuteEmbed] }).catch(() => { message.channel.send("`Error: could not DM user`") });

		setTimeout(() => {

			if (!client.MutedMembersData.has(member.id)) return

			member.timeout(null)
			const UnmuteEmbed = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(client.guilds.cache.get('975211212084232233').id)}`)
				.setTitle('Member Unmuted')
				.setDescription(`<@${member.id}> was unmuted`)
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			client.guilds.cache.get('975211212084232233').channels.cache.get('978456543479615500').send({ embeds: [UnmuteEmbed] })
			member.send(`You were unmuted!`).catch(() => { message.channel.send("Error: could not DM user") });
			client.MutedMembersData.delete(member.id)

        }, MuteTimer)
		} catch {
			message.channel.send("`Error: Could not mute user`")
		}
	}
}