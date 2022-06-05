const Discord = require('discord.js');

module.exports = {
	name: 'unban',
	args: true,
	aliases: ['ub', 'remove-ban'],
	usage: '{user} [reason]',
	description: 'Unbans a user from the server',
	permissions: 'BAN_MEMBERS',
	category: 'Moderation',
	execute(message, args) {
		const UnbanError1 = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle('Error')
			.setDescription('Invalid member')
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		const UnbanSuccess = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle('Success')
			.setDescription('User successfully unbanned')
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		message.guild.bans.fetch().then(bans => {
			let member = bans.get(args[0]);

			if (member == null) {
				message.channel.send({ embeds: [UnbanError1] });
				return;
			}

			message.guild.members.unban(args[0]) && message.channel.send({ embeds: [UnbanSuccess] })
		});

	}
}