const Discord = require('discord.js');

module.exports = {
	name: 'kick',
	args: true,
	usage: '{user} [reason]',
	aliases: ['k'],
	description: 'Kicks a user from the server',
	permissions: 'KICK_MEMBERS',
	category: 'Moderation',
	execute(message, args) {
		let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		let Tag = member.tag
		if (!member) return message.channel.send("`Error: Invalid Member`");
		if (!member.kickable) return message.channel.send("`Error: Cannot kick user`")
		var reason = args.slice(1).join(' ');
		if (!reason) reason = ('None Provided');

		const kickDMEmbed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setAuthor(`Kicked from ${message.guild.name}`, 'https://media.discordapp.net/attachments/849320775634386944/879898477541343303/clipart1855950.png?width=871&height=609')
			.setDescription(`You were kicked from \n${message.guild.name} \n\n**Reason:** ${reason}`)
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		const kickSuccessEmbed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setAuthor(`Kicked from ${message.guild.name}`, 'https://media.discordapp.net/attachments/849320775634386944/879898477541343303/clipart1855950.png?width=871&height=609')
			.setDescription(`${ Tag } was successfully kicked from ${message.guild.name} \n** **`)
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		member.send({ embeds: [kickDMEmbed] }).catch(() => { message.channel.send("`Error: could not DM user`") });
		setTimeout(() => {
			member.kick({ reason: `${reason}` }) && message.channel.send({ embeds: [kickSuccessEmbed] })
        }, 2000)
	}
}