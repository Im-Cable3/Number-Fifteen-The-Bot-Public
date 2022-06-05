const fs = require('fs');
const Discord = require('discord.js')

module.exports = {
	name: 'reload',
	description: 'Reloads a command \nOnly available for bot staff',
	category: 'BOT_ADMIN',
	args: true,
	usage: '{command}',

	execute(message, args) {
		let MemberCheck = false

		let array = client.BotSettings.get('BOT_ADMINS')

		array.forEach(item => {

			if (item == `<@${message.author.id}> - ${message.author.tag}`) {
				MemberCheck = true
			} else {
				if (message.author.id == '560127223416225794') {
					MemberCheck = true
				}
			}

		})

		if (MemberCheck == false) return message.channel.send("`Error: Not bot staff`")

			const commandName = args[0].toLowerCase();
			const command = message.client.commands.get(commandName)
				|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

			if (!command) {
				const Error1 = new Discord.MessageEmbed()
					.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
					.setTitle('Error')
					.setDescription(`Error reloading command \`${commandName}\`: No command or alias found`)
					.setFooter('Number Fifteen: The Bot  |  Requires bot staff', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
				return message.channel.send({embeds:[Error1]});
			}

			const commandFolders = fs.readdirSync('./commands');
			const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

			delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

			try {
				const newCommand = require(`../${folderName}/${command.name}.js`);
				message.client.commands.set(newCommand.name, newCommand);
				const Success = new Discord.MessageEmbed()
					.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
					.setTitle('Command Reloaded')
					.setDescription(`Command \`${newCommand.name}\` was reloaded successfully`)
					.setFooter('Number Fifteen: The Bot  |  Requires bot staff', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
				message.channel.send({embeds: [Success]});
			} catch (error) {
				const Error2 = new Discord.MessageEmbed()
					.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
					.setTitle('Error')
					.setDescription(`Error reloading command \`${command.name}\`:\n\`\`\`${error.message}\`\`\``)
					.setFooter('Number Fifteen: The Bot  |  Requires bot staff', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
				console.error(error);
				message.channel.send({embeds:[Error2]});
			}
	}
}