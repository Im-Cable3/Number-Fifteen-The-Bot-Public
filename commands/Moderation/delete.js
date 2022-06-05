const Discord = require('discord.js');

module.exports = {
	name: 'delete',
	description: 'Deletes a certain amount of messages in a channeli',
	aliases: ['destroy', 'bulk-delete', 'bulk-destroy'],
	args: true,
	usage: '{Number of messages to delete}',
	permissions: 'MANAGE_MESSAGES',
	category: 'Moderation',
	execute(message, args) {
		const DeleteError1 = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle('Error')
			.setDescription('Invalid amount of messages specified')
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		const DeleteError2 = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle('Error')
			.setDescription('Must be between 2 and 100 messages')
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.channel.send({ embeds: [DeleteError1] });

		} else if (amount < 2 || amount > 100) {
			return message.channel.send({ embeds: [DeleteError2] });
		} message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send ('`Error when deleting messages`')
		})
	},
};