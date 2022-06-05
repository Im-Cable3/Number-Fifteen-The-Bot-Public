
const Discord = require('discord.js');
const ms = require('ms');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'settings',
	description: 'Shows the server\'s settings',
	aliases: ['moderation-settings', 'bot-settings'],
	category: 'Administrative',
	execute(message, args) {
		const { Localprefix } = require('../../voximus.js');

		let StaffRole = `<@&${client.StaffRoleData.get(message.guild.id)}>`

		
		if (client.StaffRoleData.get(message.guild.id) == null) {
			StaffRole = 'Not Set'
		}
		const settingsEmbed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle('Settings')
			.setAuthor(`${message.guild.name}`)
			.setDescription(`Use \`${Localprefix}help\` for info on how to change settings \n\n**10 disabled options due to custom settings**`)
			.addFields(
				{ name: 'Staff Role', value: `${StaffRole}`, inline: true },
				{ name: 'Server Prefix', value: `${Localprefix}`, inline: true },
			)
			.setFooter(`Number Fifteen: The Bot  |  Use ${Localprefix}help to change settings`, 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		message.channel.send({ embeds: [settingsEmbed]})
	}
}