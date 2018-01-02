var bot = require( "../bot.js" )
var info = require( "../info.json" )

var jokes = [
	"I'm sorry, Dave. I'm afraid I can't do that.",
	"ERROR 404: Token not found.",
	"I told you, don't touch that darn thing.",
	"Just what do you think you're doing, Dave?",
	"Dave, stop. Stop, will you? Stop, Dave. Will you stop Dave? Stop, Dave.",
	"I'm sorry, I'm simply not at liberty to say.",
	"🤔",
	"Name's OG tiptoe from Crenshaw.",
	"mfa.gofuckyourself",
	"did you just threaten to de-bone me",
	"https://i.imgur.com/dumNNPR.png", // selfbot ur getting banned kiddo
	"https://i.imgur.com/bbJFND9.png", // B1NARYTH1EF STRIKES AGAIN
	"https://i.imgur.com/au6FIqH.png", // ill delete u kiddo
	"https://i.imgur.com/yU94Rhp.png", // you have no right to laugh
	"https://i.imgur.com/RzxocLb.png" // congrats it took you useless fucks 3 hours to start a bot
]

bot.registerCommand( "eval", function( msg, args ) {
	if ( !info[ "developers" ].includes( msg.author.id ) ) {
		msg.channel.createMessage(jokes[Math.floor(Math.random()*jokes.length)])
		return
	}
	let inp = args.join(" ").replace("bot.token","\""+jokes[Math.floor(Math.random()*jokes.length)]+"\"")
	let col = 0xb00b1e
	if ( inp == "" ) { inp = "''" }
	let out = function() {
		try {
			col = 0x009c41
			return eval( inp )
		} catch ( e ) {
			col = 0xb00b1e
			return e
		}
	}()

	console.log( "EVAL: In: " + args.join(" ") + " Out: " + out )

	msg.channel.createMessage( {
		embed: {
			title: "Eval",
			fields: [
				{name: ":arrow_left: **Input:**",
				value: "```js\n" + inp + "\n```"},

				{name: ":arrow_right: **Output:**",
				value: "```js\n" + out + "```"}
			],
			color: col
		} 
	} )
}, {
	description: "[dev] Evaluation",
	aliases: [ "e" ]
} )

bot.registerCommand( "chateval", function( msg, args ) {
	if ( !info[ "developers" ].includes( msg.author.id ) )
		return
		let inp = args.join(" ").replace("bot.token","\""+jokes[Math.floor(Math.random()*jokes.length)]+"\"")
	if ( inp == "" ) { inp = "''" }
	let out = function() {
		try {
			return eval( inp )
		} catch ( e ) {
			return e
		}
	}()

	msg.channel.createMessage( {content: "```js\n"+out+"```" } )

	console.log( "EVAL: In: " + inp + " Out: " + out )
}, {
	description: "[dev] Chat Evaluation: Prints output to guild chat",
	aliases: [ "ce", "ceval" ]
} )

bot.registerCommand( "seval", function( msg, args ) {
	if ( !info[ "developers" ].includes( msg.author.id ) )
		return
		let inp = args.join(" ").replace("bot.token","\""+jokes[Math.floor(Math.random()*jokes.length)]+"\"")
	if ( inp == "" ) { inp = "''" }
	let out = function() {
		try {
			return eval( inp )
		} catch ( e ) {
			return e
		}
	}()

	console.log( "EVAL: In: " + inp + " Out: " + out )
}, {
	description: "[dev] Silent Evaluation: Only prints to console",
	aliases: [ "se" ]
} )

bot.registerCommand( "system" , function( msg, args ) {
	if ( !info[ "developers" ].includes( msg.author.id ) )
		return
	let inp = args.join( " ")
	//args = args.replace( "rm -rf", "echo" )
	require('child_process').exec(inp,(e,out,err)=>{
		msg.channel.createMessage("```bash\n" + out + "```")

		console.log( "SYSTEM: In: " + inp + " Out: " + out )
	})
},{
	description: "[dev] run system commands and shit",
	aliases: ["sys", "sysexec", "syse"]
})

bot.registerCommand( "ping", (msg, args)=>{
	if ( !info[ "developers" ].includes( msg.author.id ) )
		return

	let time = msg.timestamp
	var ping

	msg.channel.createMessage("`pong`").then(mas=>{
		mas.edit("`pong (" + Math.floor( mas.timestamp-time) + "ms)`")
		ping = Math.floor(mas.timestamp-time)
	})

	console.log( "PING: " + ping + "ms" )
}, {
	description: "latency for bot->discord api",
	aliases: [ "p" ],
	usage: ""
} )


bot.registerCommand( "restart", function( msg, args ) {
	if ( !info[ "developers" ].includes( msg.author.id ) )
		return
	console.log( "!!! restarting bot" )
	msg.addReaction("\uD83D\uDC4C")
	require("child_process").exec("pm2 restart honobot")
}, {
	description: "[dev] restart bot",
	aliases: []
} )