const Discord = require('discord.js');
module.exports = {
	name: 'server-info',
	description: 'Gives information about server name, member count, and creation date',
	aliases: ['server-information'],
	category: 'Information',
	execute(message, args) {
		const { Localprefix } = require('../../voximus.js')
		//-----
		let Description = message.guild.description
		if (Description == null) {
			Description = 'None'
		}
		//-----
		let PartnerStatus = message.guild.partnered
		if (PartnerStatus == false) {
			PartnerStatus = 'Not Partnered'
		}
		if (PartnerStatus == true) {
			PartnerStatus = 'Partnered'
		}
		//-----
		let VerifiedStatus = message.guild.verified
		if (VerifiedStatus == false) {
			VerifiedStatus = 'Not Verified'
		}
		if (VerifiedStatus == true) {
			VerifiedStatus = 'Verified'
		}
		//-----
		let ExplicitFilter = message.guild.explicitContentFilter
		if (ExplicitFilter == 'DISABLED') {
			ExplicitFilter = 'Disabled'
		}
		if (ExplicitFilter == 'MEMBERS_WITHOUT_ROLES') {
			ExplicitFilter = 'Low'
		}
		if (ExplicitFilter == 'ALL_MEMBERS') {
			ExplicitFilter = 'High'
		}
		//-----
		let NotificationStatus = message.guild.defaultMessageNotifications
		if (NotificationStatus == 'ONLY_MENTIONS') {
			NotificationStatus = 'Mentions Only'
		}
		if (NotificationStatus == 'ALL_MESSAGES') {
			NotificationStatus = 'All Messages'
    }
		//-----
		let NSFWStatus = message.guild.nsfwLevel
		if (NSFWStatus == 'DEFAULT') {
			NSFWStatus = 'Disabled'
		}
		if (NSFWStatus == 'EXPLICIT') {
			NSFWStatus = 'Explicit'
		}
		if (NSFWStatus == 'SAFE') {
			NSFWStatus = 'Safe'
		}
		if (NSFWStatus == 'AGE_RESTRICTED') {
			NSFWStatus = 'Age Restricted'
		}
		//-----
		let MFALevel = message.guild.mfaLevel
		if (MFALevel == 'NONE') {
			MFALevel = 'None'
		}
		if (MFALevel == 'ELEVATED') {
			MFALevel = '2FA Required'
		}//-----
		let NitroLevel = message.guild.premiumTier
		if (NitroLevel == 'NONE') {
			NitroLevel = 'No Level'
		}
		if (NitroLevel == 'TIER 1') {
			NitroLevel = 'Level 1'
		}
		if (NitroLevel == 'TIER 2') {
			NitroLevel = 'Level 2'
		}
		if (NitroLevel == 'TIER 3') {
			NitroLevel = 'Level 3'
        }
		//-----
		const ServerInfo = new Discord.MessageEmbed() //caching error known
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle(`${message.guild.name}`)
			.setThumbnail(`${message.guild.iconURL({ format: 'png', dynamic: true })}`)
			.setDescription(`Use ${Localprefix}server-features for current feature list`)
			.addFields(
				{ name: 'Member Count', value: `\`\`\`${message.guild.members.cache.size}\`\`\``, inline: true },
				{ name: 'User Count', value: `\`\`\`${message.guild.members.cache.filter(member => !member.user.bot).size}\`\`\``, inline: true },
				{ name: 'Bot Count', value: `\`\`\`${message.guild.members.cache.filter(member => member.user.bot).size}\`\`\``, inline: true },
				{ name: 'Notifications', value: `\`\`\`${NotificationStatus}\`\`\``, inline: true },
				{ name: 'Partner Status', value: `\`\`\`${PartnerStatus}\`\`\``, inline: true },
				{ name: 'Verification Status', value: `\`\`\`${VerifiedStatus}\`\`\``, inline: true },
				{ name: 'Mod Requirement', value: `\`\`\`${MFALevel}\`\`\``, inline: true },
				{ name: 'NSFW Status', value: `\`\`\`${NSFWStatus}\`\`\``, inline: true },
				{ name: 'Explicit Filter', value: `\`\`\`${ExplicitFilter}\`\`\``, inline: true },
				{ name: 'Number of Boosts', value: `\`\`\`${message.guild.premiumSubscriptionCount}\`\`\``, inline: true },
				{ name: 'Server Level', value: `\`\`\`${NitroLevel}\`\`\``, inline: true },
				{ name: 'Channels', value: `\`\`\`${message.guild.channels.cache.size} Channels\`\`\``, inline: true },
				{ name: 'Roles', value: `\`\`\`${message.guild.roles.cache.size} Roles\`\`\``, inline: true },
				{ name: 'Emojis', value: `\`\`\`${message.guild.emojis.cache.size} Emojis\`\`\``, inline: true },
				{ name: 'Stickers', value: `\`\`\`${message.guild.stickers.cache.size} Stickers\`\`\``, inline: true },
				{ name: 'Creation Date', value: `\`\`\`${message.guild.createdAt}\`\`\``, inline: true },
				{ name: 'Server ID', value: `\`\`\`${message.guild.id}\`\`\``, inline: true },
		)
		
			.setFooter(`Number Fifteen: The Bot  |  ${message.guild.name}`, 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
		message.channel.send({ embeds: [ServerInfo] });
	},
};