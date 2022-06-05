const Discord = require('discord.js');
module.exports = {
	name: 'set-staff-role',
	args: true,
	usage: '{role}',
	aliases: ['ssr'],
	description: 'Changes the current server\'s staff role',
	permissions: 'MANAGE_GUILD',
	category: 'Administrative',
	execute(message, args) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle('Error')
			.setDescription('Invalid role mentioned')
			.setFooter(`Number Fifteen: The Bot`, 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		try {
			var StaffRole = message.mentions.roles.first().id
			message.member.guild.roles.cache.get(StaffRole);
		} catch {
			
			return message.channel.send({ embeds: [ErrorEmbed] })
		}
		let SuccessEmbed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle('Success!')
			.setDescription(`Staff role successfully set to <@&${StaffRole}>`)
			.setFooter(`Number Fifteen: The Bot`, 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		client.StaffRoleData.set(`${message.guild.id}`, `${StaffRole}`)
		message.channel.send({ embeds: [SuccessEmbed] })
	}
}