var bot = require( "../bot.js" )
var info = require( "../info.json" )
var jimp = require("jimp")

bot.registerCommand("igoogle",(msg,args)=>{
    let q = args.join(" ")
    jimp.read("img/google.png",(e,im)=>{
        jimp.loadFont(jimp.FONT_SANS_16_BLACK).then(f=>{
            im.print(f, 55, 182, q)
            im.getBuffer(jimp.MIME_PNG, (e,b)=>{
                msg.channel.createMessage("",{file:b,name:"google.png"})
            })
        })
    })
},{
    description: "google search for memes",
    aliases: [ "ig" ],
    usage: "[search]"
})
