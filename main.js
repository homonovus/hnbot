var bot = require( "./bot.js" );
var cmds = require( "./cmds.js" );

cmds.LoadBotCommands();

bot.on( "ready", () => {
	console.log( bot.user.username + "#" + bot.user.discriminator + " is ready." );
} );

process.stdin.resume();
process.stdin.setEncoding( "utf8" );
process.stdin.on( "data", function( text ) {
	eval( text );
});

bot.connect();