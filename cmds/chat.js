var bot = require( "../bot.js" )
var info = require( "../info.json" )
var request = require('request')

let nums = [
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine"
]

bot.registerCommand( "quote", (msg, args)=>{
	let msgid = args[0].trim().toString()
	let mVar = []

	try {
		msg.channel.getMessages(1, undefined, undefined, msgid).then(messages => {
			messages.forEach(message => {
				mVar.push(message)
			})
		})
	} catch(e) {
		console.log(e)
	}
	setTimeout(function () {
		let message = mVar[0]
		let highest = message.channel.guild ? message.channel.guild.roles.get((message.channel.guild.members.get(message.author.id).roles[0])) : undefined
		if(highest !== undefined && highest.color === 0) {highest.position = 0}
		if (highest !== undefined)
			message.channel.guild.members.get(message.author.id).roles.forEach(r1 => {
				if(message.channel.guild.roles.get(r1).color !== 0) {
					highest = message.channel.guild.roles.get(r1).position > highest.position ? message.channel.guild.roles.get(r1) : highest
				}
			})
		let col = 0xb00b1e
		col = highest !== undefined ? (highest.color ? highest.color : col) : col
		msg.channel.createMessage({
			content: "",
			embed: {
				color: col,
				author: message.author ? {name:message.author.username + "#" + message.author.discriminator, icon_url:message.author.avatarURL } : undefined,
				description: message.content !== undefined ? message.content.toString() : " ",
				image: message.attachments.length > 0 ? {url: message.attachments[0].url} : (message.content.match(/(https?:\/\/.*\.(?:png|jpg|gif|gifv))/i) ? { url: message.content.match(/(https?:\/\/.*\.(?:png|jpg|gif|gifv))/i)[0] } : undefined),
				timestamp: new Date(message.timestamp)
			}
		})
	}, 500)
}, {
	usage: "[message id]",
	description: "quote a message",
	aliases: [ "q" ]
} )

bot.registerCommand( "emojisplit", (msg,args)=>{
	let emoji = args[0] let text = args.splice(1).join(" ")
	msg.channel.createMessage(emoji+text.split(" ").join(emoji)+emoji)
}, {
	usage: "[emoji] [phrase]",
	description: "put an emoji between every word of a phrase",
	aliases: [ "es" ]
})

bot.registerCommand( "selfprune", (msg, args)=>{
	if ( !info[ "developers" ].includes( msg.author.id ) )
		return
	let amount = args[1]
	msg.channel.getMessages( amount ).then(msgs=>{
		let d = 0
		let er = 0
		msgs.forEach(m=>{
			if (m.author.id == bot.user.id)
				try {
					m.delete().then( ()=>{
						d++
						let f = ()=>{
							if (er >0) { return " Errors occured while deleting **" + er + "**." } else { return "" }
						}

						if ( d == amount) {
							bot.createMessage( msg.channel.id, `**${d}** messages were deleted by **${msg.author.usernameEscaped()}#${msg.author.discriminator}**. ${f()}` )
						}
					})
				} catch(e) {
					er++
				}
		})
	})
}, {
	description: "[dev] prune ur shit",
	aliases: [ "prune", "sprune", "sp" ]
} )

bot.registerCommand( "emojitype", (msg,args)=>{
	let inp = args.join(" ").split("")
	let mes = ""
	for (x in inp){
		if (inp[x] == " " || inp[x]==""){
			mes += "  "
			continue
		} else if (inp[x].toLowerCase() == "a") {
			mes += ":a: "
		} else if (inp[x].toLowerCase() == "b") {
			mes += ":b: "
		} else if (inp[x].toLowerCase() == "o") {
			mes += ":o2: "
		} else if (nums[inp[x]]) {
			mes += ":" + nums[inp[x]] + ": "
		} else {
			mes += ":regional_indicator_"+inp[x].toLowerCase()+": "
		}
	}

	msg.channel.createMessage(mes)
}, {
	usage: "[message]",
	description: "type with emojis",
	aliases: [ "et" ]
})

bot.registerCommand("help",(msg,args)=>{
	let meme = "`( )` = optional parameter\n `[ ]` = required paramter\n```ini\n"

	for (c in bot.commands){
		let cmd = bot.commands[c]
		if (cmd.description.search(/\[dev\]/) != -1 && !info["developers"].includes(msg.author.id))
			continue
		
		meme += "["+cmd.label+"]\n"
		meme += "\tUsage: "+(cmd.usage || "no documented usage")+"\n"
		meme += "\tDescription: "+(cmd.description || "no description given")+"\n"
		meme += "\tAliases: ["+(cmd.aliases.toString())+"]\n"
	}
	meme+="```"

	msg.addReaction("\ud83d\udce7")

	msg.author.getDMChannel().then(c=>{
		c.createMessage(meme)
	})
}, {
	description: "help",
	usage: "(command)"
})