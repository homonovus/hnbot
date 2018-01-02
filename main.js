var bot = require( "./bot.js" )
var cmds = require( "./cmds.js" )
var fs = require("fs")

cmds.LoadBotCommands()

bot.on( "ready", () => {
	console.log( bot.user.username + "#" + bot.user.discriminator + " online" )
	bot.editStatus("online",{name:`the screams of ${bot.users.filter(u=>!u.bot).length} mortal souls in ${bot.guilds.size} realms`,type:2})
} )

bot.on( "guildCreate", (g)=>{
	console.log(`joined [${g.name}:${g.id}]`)
	/* let mems = g.members.filter(m=>!m.bot).length
	let bots = g.members.filter(m=>m.bot).length */
	/* if (bots/mems > .7) {
		console.log(`leaving bot collection [${g.name}:${g.id}]`)
		g.leave()
		return
	} */

	if (!fs.existsSync(`./config/${g.id}.json`)) {
		console.log(`creating config for [${g.name}:${g.id}]`)
		let conf = fs.createWriteStream(`./config/${g.id}.json`)

		conf.write(fs.readFileSync(`./config/default.json`))

		conf.end()
	}

	bot.editStatus("online",{name:`the screams of ${bot.users.filter(u=>!u.bot).length} mortal souls in ${bot.guilds.size} realms`,type:2})
})

bot.on("messageCreate", (msg)=>{
	if ( !msg.channel.guild || !fs.existsSync(`./config/${msg.channel.guild.id}.json`) || 
		!(require(`./config/${msg.channel.guild.id}.json`)["msgreact"].value == "true") ||  
		msg.author.id == bot.user.id || msg.type == 7 || msg.type == 6)
		return // i hate js sometimes
	let devnull = msg.channel.guild.members.get("344832882419695617")

	if (msg.content.trim().toLowerCase() == "me too" && (!devnull || devnull.status == "offline" )) {
		msg.channel.createMessage("thanks")
	} else if ((msg.content.trim().toLowerCase() == "me too thanks" || msg.content.trim().toLowerCase() == "me_irl" || msg.content.trim().toLowerCase() == "meirl") && (!devnull || devnull.status == "offline" )) {
		msg.channel.createMessage("me too thanks")
	} else if (msg.content.trim().toLowerCase() == "e"){
		msg.channel.createMessage(msg.author.mention+" did it! \uD83D\uDE23\uD83D\uDD2B")
	} else if (msg.content.trim().toLowerCase() == "nice" || msg.content.trim().toLowerCase() == "soon") {
		msg.addReaction("™")
	} else if (msg.content.trim().toLowerCase() == "good bot" && (!devnull || devnull.status == "offline")) { 
		msg.channel.createMessage("thank")
	} else if (msg.content.trim().toLowerCase() == "bad bot" && (!devnull || devnull.status == "offline")) {
		msg.channel.createMessage("i try :(")
	} else if (msg.content.trim() == "™") {
		msg.addReaction("\uD83C\uDDF3").then(()=>{msg.addReaction("\uD83C\uDDEE")}).then(()=>{msg.addReaction("\uD83C\uDDE8")}).then(()=>{msg.addReaction("\uD83C\uDDEA")}) // NICE
	}
})

bot.connect()
