const Discord = require('discord.js');

module.exports = {
	name: "prefix",
	usage: "{prefix}",
	aliases: ['change-prefix', 'set-prefix'],
	description: "Changes the server prefix",
	permissions: "ADMINISTRATOR",
	category: 'Utility',
	execute(message, args) {
		const { Localprefix } = require('../../voximus.js');
	
		if (!args[0]) {
			const InvalidPrefix1 = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setAuthor('Alert')
				.setDescription(`Current Prefix is \`${Localprefix}\`\nUse \`${Localprefix}prefix\` to change`)
				.setFooter(`Number Fifteen: The Bot`, 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			return message.channel.send({ embeds: [InvalidPrefix1] });
		}
		if (args[0] === " ") {
			const InvalidPrefix2 = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setAuthor('Error')
				.setDescription('Invalid Prefix')
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			return message.channel.send({ embeds: [InvalidPrefix2] });
		}
		if (args[0] > 100) {
			const InvalidPrefix3 = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setAuthor('Error')
				.setDescription('Error: Prefix must be under 100 charachters')
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			return message.channel.send({ embeds: [InvalidPrefix3] });
		}
		client.PrefixData.set(`${message.guild.id}`, `${ args[0].toLowerCase()}`)
		const SuccessPrefix = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setAuthor('Success')
			.setDescription(`Prefix successfully set to \`${args[0]}\``)
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		message.channel.send({ embeds: [SuccessPrefix] });
	}
};