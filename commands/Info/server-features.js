const Discord = require('discord.js');

module.exports = {
	name: 'server-features',
	description: 'Shows the server\'s feature list',
	category: 'Information',
	execute(message, args) {
		let FeatureList = message.guild.features
		let NoValue = 'NO VALUE'

		const ServerFeaturesEmbed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle('Server Features')
			.setDescription(`${message.guild.name} has ${FeatureList.length} features unlocked \n\n\`\`\`${FeatureList.join('\n').replaceAll('_', ' ') || NoValue}\`\`\``)
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		message.channel.send({embeds: [ServerFeaturesEmbed]})
	}
}