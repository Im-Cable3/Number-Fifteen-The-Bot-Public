const Discord = require('discord.js');
module.exports = {
	name: 'help',
	description: 'Shows command list, or info for a specific command',
	category: 'Information',
	
	execute(message, args) {
		const { Localprefix } = require('../../voximus.js');
		const data = [];
		const { commands} = message.client;
		let BOT_OWNER = commands.filter(command => command.category == 'BOT_OWNER').map(command => command.name)
		let BOT_ADMIN = commands.filter(command => command.category == 'BOT_ADMIN').map(command => command.name)
		let Moderation = commands.filter(command => command.category == 'Moderation').map(command => command.name)
		let Information = commands.filter(command => command.category == 'Information').map(command => command.name)
		let General = commands.filter(command => command.category == 'General').map(command => command.name)
		let Utility = commands.filter(command => command.category == 'Utility').map(command => command.name)
		let Administrative = commands.filter(command => command.category == 'Administrative').map(command => command.name)
		
		if (!args.length) {
			if (message.author.id == '560127223416225794') {
				const helpEmbed = new Discord.MessageEmbed()
					.setAuthor(`Help | Showing ${BOT_OWNER.length + BOT_ADMIN.length} Hidden Commands`, "https://media.discordapp.net/attachments/849320775634386944/879534959059148820/1838605.png")
					.setTitle(`${Moderation.length + Information.length + General.length + Utility.length + Administrative.length + BOT_ADMIN.length + BOT_OWNER.length} Total Commands`)
					.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
					.setDescription(`Use \`${Localprefix}help [command name]\` to view specific command info\n** **`)
					.addFields(
						{ name: `[${BOT_OWNER.length}]  BOT OWNER`, value: `\`\`\`\n${BOT_OWNER.join(' | ')}\`\`\`\n** **` },
						{ name: `[${BOT_ADMIN.length}]  BOT ADMIN`, value: `\`\`\`\n${BOT_ADMIN.join(' | ')}\`\`\`\n** **` },
						{ name: `[${Moderation.length}]  MODERATION`, value: `\`\`\`\n${Moderation.join(' | ')}\`\`\`\n** **` },
						{ name: `[${Information.length}]  INFORMATION`, value: `\`\`\`\n${Information.join(' | ')}\`\`\`\n** **` },
						{ name: `[${General.length}]  GENERAL`, value: `\`\`\`\n${General.join(' | ')}\`\`\`\n** **` },
						{ name: `[${Utility.length}]  UTILITY`, value: `\`\`\`\n${Utility.join(' | ')}\`\`\`\n** **` },
						{ name: `[${Administrative.length}]  ADMINISTRATIVE`, value: `\`\`\`\n${Administrative.join(' | ')}\`\`\`` },
					)
					.setFooter('Number Fifteen: The Bot  |  BOT OWNER  |  {required} [optional]', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
				message.channel.send({ embeds: [helpEmbed] })

			} else if (message.author.id == ('560127223416225794' || '517335900607479808')) {

					const helpEmbed = new Discord.MessageEmbed()
						.setAuthor(`Help | Showing ${BOT_ADMIN.length} Hidden Commands`, "https://media.discordapp.net/attachments/849320775634386944/879534959059148820/1838605.png")
						.setTitle(`${Moderation.length + Information.length + General.length + Utility.length + Administrative.length + ADMIN_BOT.length} Total Commands`)
						.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
						.setDescription(`Use \`${Localprefix}help [command name]\` to view specific command info\n** **`)
						.addFields(
							{ name: `[${BOT_ADMIN.length}]  BOT ADMIN`, value: `\`\`\`\n${BOT_ADMIN.join(' | ')}\`\`\`\n** **` },
							{ name: `[${Moderation.length}]  MODERATION`, value: `\`\`\`\n${Moderation.join(' | ')}\`\`\`\n** **` },
							{ name: `[${Information.length}]  INFORMATION`, value: `\`\`\`\n${Information.join(' | ')}\`\`\`\n** **` },
							{ name: `[${General.length}]  GENERAL`, value: `\`\`\`\n${General.join(' | ')}\`\`\`\n** **` },
							{ name: `[${Utility.length}]  UTILITY`, value: `\`\`\`\n${Utility.join(' | ')}\`\`\`\n** **` },
							{ name: `[${Administrative.length}]  ADMINISTRATIVE`, value: `\`\`\`\n${Administrative.join(' | ')}\`\`\`` },
						)
						.setFooter('Number Fifteen: The Bot  |  BOT ADMIN  |  {required} [optional]', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
					message.channel.send({ embeds: [helpEmbed] })
			} else {
				const helpEmbed = new Discord.MessageEmbed()
					.setAuthor("Help", "https://media.discordapp.net/attachments/849320775634386944/879534959059148820/1838605.png")
					.setTitle(`${Moderation.length + Information.length + General.length + Utility.length + Administrative.length} Total Commands`)
					.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
					.setDescription(`Use \`${Localprefix}help [command name]\` to view specific command info`)
					.addFields(
							{ name: `[${Moderation.length}] MODERATION`, value: `\`\`\`\n${Moderation.join(' | ')}\`\`\`\n** **` },
							{ name: `[${Information.length}] INFORMATION`, value: `\`\`\`\n${Information.join(' | ')}\`\`\`\n** **` },
							{ name: `[${General.length}] GENERAL`, value: `\`\`\`\n${General.join(' | ')}\`\`\`\n** **` },
							{ name: `[${Utility.length}] UTILITY`, value: `\`\`\`\n${Utility.join(' | ')}\`\`\`\n** **` },
							{ name: `[${Administrative.length}] ADMINISTRATIVE`, value: `\`\`\`\n${Administrative.join(' | ')}\`\`\``},	
					)
					.setFooter('Number Fifteen: The Bot | {required} [optional]', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
				message.channel.send({ embeds: [helpEmbed] })
            }
		} else {
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

			if (!command) {
				return message.channel.send('`Error: Command does not exist`');
			}

			let CommandPermission = []

			if (command.permissions == 'MANAGE_GUILD') {
				CommandPermission = 'Manage Server'
			} else if (command.permissions == 'KICK_MEMBERS') {
				CommandPermission = 'Kick Members'
			} else if (command.permissions == 'BAN_MEMBERS') {
				CommandPermission = 'Ban Members'
			} else if (command.permissions == 'MANAGE_MESSAGES') {
				CommandPermission = 'Manage Messages'
			} else if (command.permissions == 'MODERATE_MEMBERS') {
				CommandPermission = 'Moderate Members'
			} else {
				CommandPermission = 'Unknown'
			}

			data.push(`**Name:** \`\`\`${command.name}\`\`\``)
			data.push(`**Category:** \`\`\`${command.category}\`\`\``)
			if (command.aliases) data.push(`**Aliases: **\`\`\`${command.aliases.join(' | ')} \`\`\``);
			if (command.description) data.push(`**Description: **\`\`\`${command.description} \`\`\``);
			if (command.usage) data.push(`**Usage: ** \`\`\`${Localprefix}${command.name} ${command.usage} \`\`\``);
			if (command.permissions) data.push(`**Permissions: **\`\`\`${CommandPermission} \`\`\``);
			data.push("** **")

			const CommandDataEmbed = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setAuthor('Command Help', 'https://media.discordapp.net/attachments/849320775634386944/879534959059148820/1838605.png')
				.setDescription(data.join('\n'), { split: true })
				.setFooter('Number Fifteen: The Bot  |  {required} [optional]', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671')

			message.channel.send({ embeds: [CommandDataEmbed] })
		}
	},
};

