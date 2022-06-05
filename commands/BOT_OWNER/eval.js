const { token }= require('../../config.json')

module.exports = {
	name: 'eval',
	description: 'Evalutates the provided script\nOnly available for bot owner',
	category: 'BOT_OWNER',
	args: true,
	usage: '{script}',
	execute(message, args) {
		if (message.author.id == '560127223416225794') {
			try {
				const code = args.join(" ");
				let evaled = eval(code);
				let NoValue = '{NULL RESULT}'

				if (!typeof evaled == "string") evaled = require("util").inspect(evaled);
				message.channel.send(`\`\`\`js\n${evaled.toString().replaceAll(token, '[TOKEN REDACTED]') || NoValue}\`\`\``);
			} catch (err) {
				console.log(err)
				message.channel.send(`\`\`\`js\n${err}\`\`\``)
			}
		} else {
			message.channel.send("`Error: Not bot owner`")
        }
	}
}