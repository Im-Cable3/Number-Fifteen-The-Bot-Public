const Discord = require('discord.js')
const ms = require("pretty-ms"); // https:// www.npmjs.com/package/ms
const { Version } = require('../../config.json');

module.exports = {
	name: "statistics",
	description: "Shows bot statistics",
	aliases: ["diagnostics", "stats"],
	category: 'Information',
	execute(message, args) {

		const statistics = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle('Number Fifteen: The Bot  |  Statistics')
			.setDescription(`**Bot Uptime**\`\`\`${ms(client.uptime, { long: true })}\`\`\`\`\`\`Python\n----VOXIMUS MEMORY USAGE----\nRESIDENT SET SIZE: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB \nHEAP TOTAL: ${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB\nHEAP USED: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB\nEXTERNAL:  ${Math.round(process.memoryUsage().external / 1024)} KB\n----------------------------\`\`\``)
			.addFields(
				{ name: 'Server Count', value: `\`\`\`${client.guilds.cache.size} Servers\`\`\``, inline: true },
				{ name: 'Version', value: `\`\`\`${Version}\`\`\``, inline: true },
			)
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		message.channel.send({ embeds: [statistics] })
	}
}