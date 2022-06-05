let Discord = require('discord.js')

module.exports = {
	name: 'warn',
	args: true,
	usage: '{user} [reason]',
	aliases: ['w'],
	description: 'Warns a user',
	category: 'Moderation',
	execute(message, args) {
		if (!message.member.roles.cache.has((client.StaffRoleData.get(message.guild.id)))) return message.reply('```Error: Not Staff```')

		const InvalidMember = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle('Error')
			.setDescription("```Could not find member```")
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		let member = []
		try {
			member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		} catch {
			return message.channel.send({ embeds: [InvalidMember] })
		}

		let reason = args.slice(1).join(' ');
			if(!reason) reason = 'No reason was provided'
		

		client.WarnedMembersData.ensure(member.id, 0)
		let array = client.WarnedMemberReasons.get(member.id)
		
		array.push(`${reason}`)
		client.WarnedMemberReasons.set(member.id, array)

		client.WarnedMembersData.inc(member.id)

		if (client.WarnedMembersData.get(member.id) >= 3) {
			let BanEmbed = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('Alert')
				.setDescription(`**User should be banned for having a total of ${client.WarnedMembersData.get(member.id)} warns!**\n\n<@${member.id}> was successfully warned for: ${reason}`)
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			message.channel.send({ embeds: [BanEmbed] })
		} else {
			let BanEmbed = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('Alert')
				.setDescription(`<@${member.id}> was successfully warned for: ${reason}`)
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			member.send(`You were warned for: ${reason}`).catch(() => { message.channel.send("Error: could not DM user") });
			message.channel.send({ embeds: [BanEmbed] })
        }


	}
}