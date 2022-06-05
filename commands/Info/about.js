const Discord = require('discord.js');
const { Version } = require('../../config.json');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'about',
	description: 'Gives info about the bot',
	aliases: ['info'],
	category: 'Information',
	execute(message, args) {
		const { Localprefix } = require('../../voximus.js')

		const row1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('OPEN_PRIVACY')
					.setLabel('Privacy Information')
					.setStyle('SECONDARY'),
				)
			const aboutEmbed = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
				.setTitle('About')
				.setThumbnail('https://media.discordapp.net/attachments/849320775634386944/849320835902079036/Voximus.png?width=671&height=671')
				.setDescription('**Number Fifteen: The Bot** is a port of **VOXIMUS** designed specifically for Number Fifteen: The Server\n\nAll credits for bot bot icon goes to <@725012081895669802>\n\nPrivate bot created by <@560127223416225794> (Cable3#0815) \n\n**Contributors:** \n<@517335900607479808> (Xinfity#0104)')
				.addFields(
					{ name: 'Invite', value: `You can get VOXIMUS [here!](https://discord.com/api/oauth2/authorize?client_id=868290420591956010&permissions=268823558&scope=bot)` },
					{ name: 'Privacy and Data Management', value: `You can view the privacy policy and related information using the button below` },
				)
				.setFooter(`Number Fifteen: The Bot  |  Current Version: ${Version}`, 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		message.channel.send({ embeds: [aboutEmbed], components: [row1] });
	}


};
