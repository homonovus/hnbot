var bot = require( "../bot.js" )
var info = require( "../info.json" )
var fs = require("fs")

bot.registerCommand("config", (msg,args)=>{
    let config = require(`../config/${msg.channel.guild.id}.json`)
    let updated = false

    if (args.length == 0){ // no args given, give them raw config; TODO: freshen up
        msg.channel.createMessage("```json\n"+JSON.stringify(config, null, "\t")+"```")
    } else if (!config[args[0]]) { // no config key, so tell them
        msg.addReaction("❌")
    } else { // key given, use it
        if (args[1]) { // they gave a value to set
            if (!msg.member.permission.has("manageGuild") || !info[ "developers" ].includes( msg.author.id )) {
                msg.addReaction("🚫")
                return
            }

            let val = args.splice(1).join(" ")
            if (!config[args[0]].possibilities) {
                config[args[0]].value = val
                updated = true
            } else {
                for (x in config[args[0]].possibilities) {
                    if (val.toLowerCase() == config[args[0]].possibilities[x]) {
                        config[args[0]].value = val
                        updated = true
                    }
                }
            }
        } else { // tell value of given key
            msg.channel.createMessage("```json\n"+args[0]+": "+config[args[0]].value+"```")
        }
    }
    if (updated) {
        fs.writeFile(`./config/${msg.channel.guild.id}.json`,JSON.stringify(config),(e)=>{
            if (e) throw e
            msg.addReaction("👌")
            console.log(`saved config for [${msg.channel.guild.id}|${msg.channel.guild.name}]`)
        })
    }
}, {
    aliases: [],
    description: "edit server config",
    usage: `[key] (value)`
})

bot.registerCommand("invite", (msg,args)=>{
    let id = "0"
    if (!args || args.length == 0)
        id = bot.user.id
    else
        id = args[0]

    msg.channel.createMessage(`https://discordapp.com/oauth2/authorize?&client_id=${id}&scope=bot&permissions=0`)
}, {
    description: "get this bot, or a bot's invite link",
    usage: "(id)"
})