const Discord = require('discord.js');

module.exports = {
	name: 'ban',
	args: true,
	usage: '{user} [reason]',
	aliases: ['b'],
	description: 'Bans a user from the server',
	permissions: 'BAN_MEMBERS',
	category: 'Moderation',
	execute(message, args) {
		let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!member) return message.channel.send("`Error: Invalid Member`");
		if (!member.bannable) return message.channel.send("`Error: Cannot Ban User`");
		var reason = args.slice(1).join(' ');
		if (!reason) reason = ('None Provided');

		const banDMEmbed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setAuthor(`Banned from ${message.guild.name}`, 'https://media.discordapp.net/attachments/849320775634386944/879896100180463676/png-clipart-discord-twitch-emoji-others-logo-signage-removebg-preview.png')
			.setDescription(`You were banned from \n${message.guild.name} \n\n**Reason:** ${reason}`)
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
		const banSuccessEmbed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setAuthor(`Banned from ${message.guild.name}`, 'https://media.discordapp.net/attachments/849320775634386944/879896100180463676/png-clipart-discord-twitch-emoji-others-logo-signage-removebg-preview.png')
			.setDescription(`${member.tag} was successfully banned from ${message.guild.name} \n** **`)
			.setFooter('Number Fifteen: The Bot  |  Ban Command', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		member.send({ embeds: [banDMEmbed] }).catch(() => { message.channel.send("`Error: could not DM user`") });
		member.ban({ reason: `${reason}` }) && message.channel.send({ embeds: [banSuccessEmbed] })

	}
}
