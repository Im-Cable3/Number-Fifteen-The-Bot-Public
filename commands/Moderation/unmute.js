const Discord = require('discord.js');

module.exports = {
	name: 'unmute',
	args: true,
	usage: '{user}',
	aliases: ['um', 'remove-timeout'],
	description: 'Unmutes a user',
	permissions: 'MODERATE_MEMBERS',
	category: 'Moderation',
	execute(message, args) {

		if (!message.member.roles.cache.has((client.StaffRoleData.get(message.guild.id)))) return message.reply('```Error: Not Staff```')

		let member = message.mentions.members.first() || message.guild.members.cache(args[0]);
		if (!member) return message.channel.send("`Error: Invalid Member`");

		if (!client.MutedMembersData.has(member.id)) return message.reply("```Error: User is not muted```")

		client.MutedMembersData.delete(member.id)
		member.timeout(null)

		const UnmuteEmbed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(client.guilds.cache.get('975211212084232233').id)}`)
			.setTitle('Member Unmuted')
			.setDescription(`<@${member.id}> was unmuted`)
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');


		member.send(`You were unmuted!`).catch(() => { message.channel.send("Error: could not DM user") });
		client.guilds.cache.get('975211212084232233').channels.cache.get('978456543479615500').send({ embeds: [UnmuteEmbed] })

	}
}