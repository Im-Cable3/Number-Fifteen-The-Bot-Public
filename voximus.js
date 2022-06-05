/*
----------[PORT]----------
Created By Cable3
DO NOT REPRODUCE
PROTECTED UNDER APACHE V2 LICENSE
   - SEE LICENSE FILE
https://github.com/Im-Cable3/Voximus
Requires:
  - Node v16+ https://nodejs.org/dist/v16.9.1/node-v16.9.1-x64.msi [Windows] | https://nodejs.org/dist/v14.17.6/node-v14.17.6-linux-armv7l.tar.xz [Linux ARMv7]
  - discord.js [v13] https://www.npmjs.com/package/discord.js?source=post_page-----7b5fe27cb6fa
  - enmap https://www.npmjs.com/package/enmap
  - ms https://www.npmjs.com/package/ms
  - pretty-ms https://www.npmjs.com/package/pretty-ms
  - day.js http://www.npmjs.com/package/dayjs
*/


const fs = require('fs');
const Discord = require('discord.js');
const Intents = Discord.Intents;
const { token, ActivityStatus, Version } = require('./config.json');
const Enmap = require('enmap');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const relativeTime = require('dayjs/plugin/relativeTime')
const dayjs = require('dayjs')

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_PRESENCES] });
global.client = client;
client.commands = new Discord.Collection(); //all commands must be in COMMANDS subfolder
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command); //file name and command name must be identical for RELOAD
	}
}

//Databases
client.PrefixData = new Enmap({ name: "PrefixData" })
client.StaffRoleData = new Enmap({ name: "StaffRoleData" })
client.WarnedMembersData = new Enmap({ name: "WarnedMembersData" })
client.DisabledMemberData = new Enmap({ name: "DisabledMemberData" })
client.MutedMembersData = new Enmap({ name: "MutedMembersData" })
client.ServerListPageData = new Enmap({ name: "ServerListPageData" })
client.EmbedColorSelectData = new Enmap({ name: 'EmbedColorSelectData' })
client.BotSettings = new Enmap({ name: 'BotSettings' })
client.afkUsers = new Enmap({ name: 'afkUsers' })
client.DeleteAFKUser = new Enmap({ name: 'DeleteAfk' })
client.DeleteAFKPing = new Enmap({ name: 'DeleteAfk' })
client.BotAnnouncements = new Enmap({ name: 'BotAnnouncements' })
client.WarnedMemberReasons = new Enmap({ name: 'WarnedMemberReasons' })
client.AFKNames = new Enmap({ name: "AFKNames" })


client.once('ready', () => {
	let HOV = client.guilds.cache.get('975211212084232233')
	HOV.members.fetch().then(() => {
		var MemberCount = HOV.members.cache.size.toString()
		HOV.channels.fetch().then(() => {
			var ChannelCount = HOV.channels.cache.size.toString()
				const StartEmbed = new Discord.MessageEmbed()
					.setColor('#010101')
					.setTitle('STARTUP SUCCESSFUL')
					.setDescription(`\`\`\`js\nTIME: ${new Date().toLocaleString()} EST\nRAM: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} MEGABYTES\n\nMEMBERS: ${MemberCount} CACHED\nCHANNELS: ${ChannelCount} CACHED\nDEV MODE: ENABLED\n - NODE: 16.8.0\n - DISCORD.JS: 13.7.0\n - ENMAP: 5.9.0\n - MS: 2.1.3\n - PM2: 5.2.0\n - PRETTY-MS: 7.0.1\`\`\``)
					.setFooter('[PORT] V O X I M U S', 'https://media.discordapp.net/attachments/849320775634386944/849320835902079036/Voximus.png?width=671&height=671');
				let channel = client.channels.cache.get('978096735152922645')
				channel.send({ embeds: [StartEmbed] })
		})
	})

	console.log(`Connection Successfull \nVOXIMUS ${Version} ONLINE`);
	client.user.setActivity(`${ActivityStatus}`, { type: "PLAYING" })


});

client.on('messageCreate', message => {

	if (!message.guild) return;

	if (client.DisabledMemberData.has(message.author.id)) return;
	if (message.author.bot) return

	if (client.afkUsers.has(message.author.id)) { 
		client.afkUsers.delete(message.author.id)
		message.reply(`Welcome back <@${message.author.id}>, I removed your AFK`)
		if (client.AFKNames.has(message.author.id)) {
			message.member.setNickname(`${client.AFKNames.get(message.author.id)}`, 'Removed AFK')
			client.AFKNames.delete(message.author.id)
		}
	}
	
	if (message.mentions.has) {
		if (message.mentions.users) {
			message.mentions.users.forEach(mention => {
				if (mention.role) return
				if (mention.everyone == true) return
				if (client.afkUsers.has(mention.id)) {
					let status = `: ${client.afkUsers.get(mention.id)}`
					if (client.afkUsers.get(mention.id) === true) {
						status = ''
					}

					message.reply(`**${client.AFKNames.get(mention.id)}** is AFK:${status}`)
				}
			})
		}
	}
	/*
	if (message.channel.id == '978492827661111326') {

		if (message.author.id == client.BotSettings.get('COUNTING_ID')) return message.delete()

		client.BotSettings.ensure('COUNTING', 1)
		if (message.content == (`${client.BotSettings.get('COUNTING')}`)) {
			client.BotSettings.inc('COUNTING')
			client.BotSettings.set('COUNTING_ID', message.author.id)
		} else {
			client.BotSettings.set('COUNTING', 1)
			message.author.send("Nice job. You messed it up for everyone. Hope you're happy with yourself.").catch(() => { return });
			message.channel.send(`<@${message.author.id}> ruined it for everyone. Now have fun starting again at 1`)
        }
    }
	*/
	client.PrefixData.ensure(message.guild.id, 'ffs!')
	client.EmbedColorSelectData.ensure(message.guild.id, '#d9688a')
	const Localprefix = client.PrefixData.get(message.guild.id)
	module.exports.Localprefix = `${Localprefix}`;
	
	if (!message.content.toLowerCase().startsWith(Localprefix)) return; 
	const args = message.content.slice(Localprefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


	if (!command) return;

	if (command.permissions) {

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

		let permissionembed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle('Invalid Permissions')
			.setDescription(`To use this command, you need to have the permission \`${CommandPermission}\``)
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
		const authorPerms = message.channel.permissionsFor(message.author); //checks permissions of user executing command
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.channel.send({ embeds: [permissionembed] });
		}
	}

	if (command.args && !args.length) {
		let argsEmbed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(message.guild.id)}`)
			.setTitle('Invalid Arguments Provided')
			.setDescription(`Proper argument usage: \`${Localprefix}${command.name} ${command.usage}\``) // {required} [optional]`)
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671'); //detects improper arguments

		return message.channel.send({ embeds: [argsEmbed] });
	}
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);

		const ErrorMessage = new Discord.MessageEmbed()
			.setColor('#FF0000')
			.setDescription(`An error has occured. Please try again\nError ID: \`${message.channel.id}${message.id}\``)

		const InternalError = new Discord.MessageEmbed()
			.setColor('#FF0000')
			.setTitle('INTERNAL ERROR')
			.setAuthor(`VOXIMUS ERROR ALERT`, 'https://media.discordapp.net/attachments/849320775634386944/903141657267040276/31-314378_warning-sign-exclamation-mark-in-red-triangle-alert-removebg-preview.png')
			.setDescription(`ERROR ID: \`${message.channel.id}${message.id}\`\nCOMMAND:\`${command.name}\` \n\nERROR MESSAGE: \n\`\`\`js\n${error.stack}\`\`\``)
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
		let channel = client.channels.cache.get('978096735152922645')
			channel.send({ embeds: [InternalError] })
		message.channel.send({embeds: [ErrorMessage]}); //error, logs in channel and console
	}

});

client.on('interactionCreate', async interaction => {

	//PIRVACY OPT-OUT
	if (interaction.customId === 'OPEN_PRIVACY') {

		const PrivacyEmbed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(interaction.guild.id)}`)
			.setTitle("Privacy And Data Info")
			.setDescription('Voximus collects data needed to perform basic bot functions \nA full privacy policy can be viewed using the button below \n\nYou can also request data, request data deletion, and opt-out of data collection using the buttons below')
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		const row1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('REQUEST_DATA')
					.setLabel('Request Data')
					.setStyle('DANGER'),
				new MessageButton()
					.setCustomId('REQUEST_DELETION')
					.setLabel('Request Data Deletion')
					.setStyle('DANGER'),
				new MessageButton()
					.setCustomId('OPT_OUT')
					.setLabel('Opt-Out Of Data Collection')
					.setStyle('DANGER'),
			)
		const row2 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setURL('https://sites.google.com/view/voximus/Privacy-Policy')
					.setLabel('Privacy Policy')
					.setStyle('LINK'),
			)
		await interaction.reply({ embeds: [PrivacyEmbed], components: [row1, row2] });
	}
	if (interaction.customId === 'REQUEST_DATA') {
		const DataRequestChooseEmbed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(interaction.guild.id)}`)
			.setTitle("Choose Data To Fetch")
			.setDescription('**Does not fetch locally cahced data (temporary data)** \n\nGuild Data can be viewed by a guild administrator only')
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		const row1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('GUILD_DATA')
					.setLabel('Guild Data')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId('CANCEL')
					.setLabel('Cancel')
					.setStyle('DANGER'),
				new MessageButton()
					.setCustomId('USER_DATA')
					.setLabel('User Data')
					.setStyle('SUCCESS'),
			)

		await interaction.update({ embeds: [DataRequestChooseEmbed], components: [row1] });
	}
	if (interaction.customId === 'GUILD_DATA') {
		if (interaction.member.permissions.has('ADMINISTRATOR')) {
			const GuildDataEmbed = new Discord.MessageEmbed()
				.setColor(`${client.EmbedColorSelectData.get(interaction.guild.id)}`)
				.setTitle("Guild Data")
				.setDescription(`Current guild data for \`${interaction.guild.name}\` \nIf value is \`undefined\` no data is stored in that database \n\nCurrent \`GuildId\` value \n\`\`\`${interaction.guild.id}\`\`\`\nCurrent \`ModChannel\` value \n\`\`\`${client.ModChannelData.get(interaction.guild.id)}\`\`\` \nCurrent \`PrimaryWarnRole\` value \n\`\`\`${client.PrimaryWarnRoleData.get(interaction.guild.id)}\`\`\` \nCurrent \`SecondaryWarnRole\` value \n\`\`\`${client.SecondaryWarnRoleData.get(interaction.guild.id)}\`\`\``)
				.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

			await interaction.reply({ ephemeral: true, embeds: [GuildDataEmbed] })
		} else {
			await interaction.reply({ content: 'This data is only available to server admins', ephemeral: true })
		}
	}
	if (interaction.customId === 'USER_DATA') {
		const GuildDataEmbed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(interaction.guild.id)}`)
			.setTitle("User Data")
			.setDescription(`Current user data for <@${interaction.user.id}> \n\n Current \`userId\` value \`\`\`${interaction.user.id}\`\`\`\nTotal warn/mute databases that can store your user ID as a key \n\`\`\`4 Databases\`\`\``)
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		await interaction.reply({ ephemeral: true, embeds: [GuildDataEmbed] })
	}
	if (interaction.customId === 'REQUEST_DELETION') {
		const DataDeleteEmbed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(interaction.guild.id)}`)
			.setTitle("Choose Data To Delete")
			.setDescription('**Guild Data can be cleared by a guild administrator only**')
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		const row1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('GUILD_DATA1')
					.setLabel('Guild Data')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId('CANCEL')
					.setLabel('Cancel')
					.setStyle('DANGER'),
				new MessageButton()
					.setCustomId('USER_DATA1')
					.setLabel('User Data')
					.setStyle('SUCCESS'),
			)

		await interaction.update({ embeds: [DataDeleteEmbed], components: [row1] });
	}

	if (interaction.customId === 'GUILD_DATA1') {
		const GuildDataDelete = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(interaction.guild.id)}`)
			.setTitle("DATA DELETED")
			.setDescription(`**All guild data for ${interaction.guild.name} was cleared**`)
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		client.MuteRoleData.delete(interaction.guild.id)
		client.StaffRoleData.delete(interaction.guild.id)
		client.PrimaryWarnRoleData.delete(interaction.guild.id)
		client.SecondaryWarnRoleData.delete(interaction.guild.id)
		client.WarnCooldownData.delete(interaction.guild.id)
		client.MuteEvadeLevelData.delete(interaction.guild.id)
		client.WarnEvadeLevelData.delete(interaction.guild.id)
		client.StaffRoleData.delete(interaction.guild.id)
		client.ModChannelData.delete(interaction.guild.id)
		client.PrefixData.delete(interaction.guild.id)

		await interaction.update({ embeds: [GuildDataDelete], components: [] });
	}

	if (interaction.customId === 'USER_DATA1') {
		const UserDataDelete = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(interaction.guild.id)}`)
			.setTitle("DATA DELETED")
			.setDescription(`**All user data for <@${interaction.user.id}> was cleared**`)
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');
		client.HeavyWarnedData.delete(`<@${interaction.user.id}>`)
		client.MutedMembersData.delete(`<@${interaction.user.id}>`)
		client.HeavyWarnedMembersData.delete(`<@${interaction.user.id}>`)
		client.WarnedMembersData.delete(`<@${interaction.user.id}>`)

		await interaction.update({ embeds: [UserDataDelete], components: [] });
	}
	if (interaction.customId === 'OPT_OUT') {
		const row1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('CANCEL')
					.setLabel('Cancel')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId('OPT_OUT_CONFIRMED')
					.setLabel('Continue')
					.setStyle('DANGER'),
			)
		const Success = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(interaction.guild.id)}`)
			.setTitle("WARNING")
			.setDescription("Are you sure you would like to delete all of your user data and opt-out of any future data collection? \nThis will deny your access to use the bot \n\nTo opt-out of guild data collection, you must remove the bot from your server")
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		await interaction.update({ embeds: [Success], components: [row1] })
	}
	if (interaction.customId === 'OPT_OUT_CONFIRMED') {
		client.HeavyWarnedData.delete(`<@${interaction.user.id}>`)
		client.MutedMembersData.delete(`<@${interaction.user.id}>`)
		client.HeavyWarnedMembersData.delete(`<@${interaction.user.id}>`)
		client.WarnedMembersData.delete(`<@${interaction.user.id}>`)
		client.DisabledMemberData.set(`${interaction.user.id}`, true)

		const row1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setURL('https://discord.gg/x6q4Eh8Xty')
					.setLabel('Support Server')
					.setStyle('LINK'),
				new MessageButton()
					.setCustomId('SEND_DM')
					.setLabel('Send in DM')
					.setStyle('SUCCESS'),
			)
		let OPT_OUT_SUCCESS = new Discord.MessageEmbed()
			.setColor('#d9688a')
			.setTitle("Operation Successfull")
			.setDescription("**You have opted out of data collection and all of your data has beem deleted** \nYou will be no longer able to use Voximus, and all of your requests for the bot will be rejected\n\nIf you would like to request that your data be collected again, join the support server and contact <@560127223416225794> (Cable3#1419)\nYou can also have this message sent to you for safekeeping")
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		await interaction.update({ embeds: [OPT_OUT_SUCCESS], components: [row1] })
	}
	if (interaction.customId === 'SEND_DM') {
		if (!client.DisabledMemberData.has(interaction.user.id)) return interaction.reply({ content: 'This isn\'t your message', ephemeral: true })
		const row1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setURL('https://discord.gg/x6q4Eh8Xty')
					.setLabel('Support Server')
					.setStyle('LINK'),
			)
		let OPT_OUT_SUCCESS = new Discord.MessageEmbed()
			.setColor('#d9688a')
			.setTitle("Operation Successfull")
			.setDescription("**You have opted out of data collection and all of your data has beem deleted** \nYou will be no longer able to use Voximus, and all of your requests for the bot will be rejected\n\nIf you would like to request that your data be collected again, join the support server and contact <@560127223416225794> (Cable3#1419)")
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		interaction.user.send({ embeds: [OPT_OUT_SUCCESS], components: [row1] }).catch(() => { interaction.reply({ content: 'Couldn\'t DM, make sure you have DM\'s enabled', ephemeral: true }) });
		await interaction.reply({ content: 'DM Successfull', ephemeral: true })
	}

	if (interaction.customId === 'CANCEL') {
		const GuildDataEmbed = new Discord.MessageEmbed()
			.setColor(`${client.EmbedColorSelectData.get(interaction.guild.id)}`)
			.setTitle("Request Cancelled")
			.setDescription("`Data request was cancelled`")
			.setFooter('Number Fifteen: The Bot', 'https://media.discordapp.net/attachments/975223108908752976/975915336115322880/unknown.png?width=671&height=671');

		await interaction.update({ embeds: [GuildDataEmbed], components: [] })
	}
})


client.on('guildCreate', guild => {
	client.PrefixData.set(`${guild.id}`, 'ffs!')
});

client.on('guildMemberAdd', (member) => {

	client.WarnedMembersData.ensure(member.id, 0)
	client.WarnedMemberReasons.ensure(member.id, [])

	if (member.guild.id !== '975211212084232233') return
	let channel = member.guild.channels.cache.get('975211212663062572')

	let embed = new Discord.MessageEmbed()
		.setColor('#f8dec5')
		.setDescription(`<@${member.id}>, Welcome to **Number Fifteen: The Server!** Grab some food (maybe a burger king burger👀), hydrate, and stay a while! Oh, and maybe check out ***Number Fifteen: The Podcast*** while you're at it (on all podcasting platforms now XD)`)
		.setFooter('You must verify before you can access the server')
		.setThumbnail(member.displayAvatarURL({ format: 'png', dynamic: true }))

	channel.send({embeds: [embed]})
});

client.on('guildMemberUpdate', (oldMember, newMember) => {

	if (oldMember.guild.id !== '975211212084232233') return

	//ROLE ADD
	if (newMember.roles.cache.has('975231658007613500')) { 
		if (!newMember.roles.cache.has('975437994687361094')) { 
			newMember.roles.add(oldMember.guild.roles.cache.get('975437994687361094'))
		}
	}
	if (newMember.roles.cache.has('975233004756684860')) {
		if (!newMember.roles.cache.has('975437994687361094')) {
			newMember.roles.add(oldMember.guild.roles.cache.get('975437994687361094'))
		}
	}
	if (newMember.roles.cache.has('975238531196796938')) {
		if (!newMember.roles.cache.has('975437994687361094')) {
			newMember.roles.add(oldMember.guild.roles.cache.get('975437994687361094'))
		}
	}
	if (newMember.roles.cache.has('978069137416917092')) {
		if (!newMember.roles.cache.has('975437994687361094')) {
			newMember.roles.add(oldMember.guild.roles.cache.get('975437994687361094'))
		}
	}

	//ROLE REMOVE
	if (oldMember.roles.cache.has('975231658007613500')) {
		if (!newMember.roles.cache.has('975231658007613500')) {
			newMember.roles.remove(oldMember.guild.roles.cache.get('975437994687361094'))
        }
	}

	if (oldMember.roles.cache.has('975233004756684860')) {
		if (!newMember.roles.cache.has('975233004756684860')) {
			newMember.roles.remove(oldMember.guild.roles.cache.get('975437994687361094'))
		}
	}

	if (oldMember.roles.cache.has('975238531196796938')) {
		if (!newMember.roles.cache.has('975238531196796938')) {
			newMember.roles.remove(oldMember.guild.roles.cache.get('975437994687361094'))
		}
	}

	if (oldMember.roles.cache.has('978069137416917092')) {
		if (!newMember.roles.cache.has('978069137416917092')) {
			newMember.roles.remove(oldMember.guild.roles.cache.get('975437994687361094'))
		}
	}
});

client.login(token); //token stored in config.json

/* EMBED TEMPLATE
	const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('')
	.setAuthor('Some name', 'image', 'url')
	.setDescription('Some description here')
	.setThumbnail('image')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('image')
	.setTimestamp()
	.setFooter('Some footer text here', 'image');
channel.send( {embeds: [exampleEmbed]} );
*/