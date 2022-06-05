const Discord = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'rules',
	description: 'Sends / edits the rules embed',
	category: 'BOT_OWNER',
	execute(message, args) {
		if (message.author.id !== '560127223416225794') { return message.reply('```Error: Not Bot Owner```') }
		let embed1 = new Discord.MessageEmbed()
			.setColor('#e6967b')
			.setTitle('RULES')
			.setDescription(`Welcome to **${message.guild.name}!** This is a space for both professional and newbie Creators alike! You can find us doing workshops and events here to teach y'all various skills, as well as tune in to our weekly podcast, **Number Fifteen: The Podcast!**`)
			.setThumbnail(`${client.guilds.cache.get('975211212084232233').iconURL({ format: 'png', dynamic: true })}`)
		let embed2 = new Discord.MessageEmbed()
			.setColor('#e6967b')
			.addFields(
				{ name: '1. Follow TOS and Community Guidelines', value: 'This means you must follow ***everything*** in the Discord [Terms Of Service](https://discord.com/terms) and the [Community Guidelines](https://discord.com/guidelines)' },
				{ name: '2. Absolutely No Discrimination Of Any Kind', value: 'This includes racism (hateful symbology/hate speech, "jokes" about one race or another, etc), sexism, slurs, nationalism (viewing one country as inferior/superior to another), homophobia, etc. We have a zero tolerance policy on this and breaking this rule will instantly get you banned.' },
				{ name: '3. No Disturbing Content', value: 'Videos, photos, or memes featuring animal cruelty, blood and gore, sexually explicit content or anything like this is strictly not allowed. On this note, advertising anything featuring NSFW content is not allowed and will be deleted. Also please do not use dark humor to justify talking about things that others could find triggering, and do not talk about demonic or cult-like things.' },
				{ name: '4. No Spamming', value: 'Spamming includes posting multiple pictures, repeatedly making statements that do not tie in with any conversation, role-playing, or any other such behavior.' },
				{ name: '5. Do Not DM People Unless They Have The "DMs Open" Role Or You Have Asked Permission', value: 'Some people don\'t like to receive random DMs, and we hope that you will be considerate by either checking to make sure they have the "DMs Open" role or by asking them first in general. If someone from this server is making you uncomfortable in DMs, please report it to <@575252669443211264> with proof. ***If it is not reported, we are unable to be of any help.***' },
				{ name: '6. Do Not Misuse Channels', value: 'Please use proper channels when posting memes, pictures, audio files, or having conversations. Memes and pictures should not be posted in <#977709111582031912> unless they directly relate to the conversation that is being had.' },
				{ name: '7. Be Respectful', value: 'This is one of our most important rules. This is a community server, and as such we want each member of the community to feel like their thoughts and feelings matter. We never want anyone to feel like there isn\'t a place for them here, and because of this we must insist that everyone remains respectful to each other no matter what may be going on. On this note, *please be respectful of your fellow members by not dragging any personal drama you may have with someone into the general chats/VCs.* Just have common sense and be nice!' },
				{ name: '8. Listen To Staff', value: 'The staff is here to make sure everything runs smoothly and as comfortably as possible for everyone. If we tell you to stop doing something, it is not out of a personal grudge or bias, it is because we as mods wish the best for the server and feel that something you are doing is threatening the peace. You may appeal staff decisions through DMs, but please do not argue with us in the general chats or push issues when we have made our stance clear.' },
				{ name: '9. Do Not Put Discord Server Links Anywhere', value: 'This one is pretty self-explanatory. We do not allow anyone to post links to other servers.' },
				{ name: '10. Get Roles', value: '*All members must acquire an age role for moderation purposes.* We would love for you to pick other roles as well so we can know a little bit about you but that\'s up to you! Having age roles helps the staff team.' },
				{ name: '11. 18+ Rules', value: 'To gain access to 18+ text channels and VCs (these are not NSFW channels and still follow TOS), you must DM <@575252669443211264> proof of ID to prove your age. You can cross out any personal information with the exception of your photo and Date of Birth. We understand some people may not be comfortable with this, which is why we still offer general age roles and are therefore still able to require them in this server.' },
				{ name: '12. Have Fun!', value: 'Feel free to DM staff with any other questions you may have!' },
			)
		let embed3 = new Discord.MessageEmbed()
			.setColor('#e6967b')
			.setTitle('DISCIPLINE')
			.setDescription("Breaking any of the rules will result in either a verbal warn, a timeout (mute), a warn, or a ban. Please not that warns are permanent, and accumulating 3 warns will result in ban. Depending on the reason for being banned, you may or may not recieve an appeal. If you get an appeal, you will be sent a DM with next steps. **If you do not have your DM's open, please accept a friend request that will be sent by our staff instead.**")

		const row1 = new MessageActionRow()

		row1.addComponents(
			new MessageButton()
				.setURL('https://discord.com/terms')
				.setLabel('Discord Terms of Service')
				.setStyle("LINK"),
			new MessageButton()
				.setURL('https://discord.com/guidelines')
				.setLabel('Discord Community Guidelines')
				.setStyle("LINK"),
		)

		client.channels.cache.get('975211677098340372').messages.fetch('978499816726360076').then(message1 => {
			message1.edit({ embeds: [embed1, embed2, embed3], components: [row1] })
        })

	}
}

