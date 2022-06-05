module.exports = {
	name: 'afk',
	aliases: ['set-afk', 'go-afk'],
	description: 'Sets your afk status',
	category: 'General',
	execute(message, args) {
		if (args.length !== 0) {
			let status = args.join(' ');
			if (status.length > 100) {
				return message.reply('Your AFK must be less than 100 characters!')
			}
			if (client.afkUsers.has(message.author.id)) {
				return message.reply("```Error: User already afk```")
			}
			client.afkUsers.set(message.author.id, status)
			if (message.member.roles.highest.position < message.guild.members.cache.get('892965690158489621').roles.highest.position) {
				client.AFKNames.set(message.author.id, message.author.displayName)
				message.author.setNickname(`[AFK] ${message.member.displayName}`)
			}
			message.reply(`You went AFK: ${status}`)
		} else {
			client.afkUsers.set(message.author.id, true)
			if (message.member.roles.highest.position < message.guild.members.cache.get('892965690158489621').roles.highest.position) {
				client.AFKNames.set(message.author.id, message.member.displayName)
				message.member.setNickname(`[AFK] ${message.member.displayName}`)
			}
			message.reply(`You went AFK`)

        }
	}
}