var fs = require( "fs" );
var bot = require( "./bot.js" );
var cmdFolder = "./cmds/";

LoadBotCommands = function() {
	var files = fs.readdirSync( cmdFolder );
	for ( f in files ) {
		var file = files[ f ];
		require( cmdFolder + file );
		console.log( "Loaded Command File: " + file );
	}
}

ReloadBotCommands = function() {
	var files = fs.readdirSync( cmdFolder );
	for ( cmd in bot.commands ) {
		bot.unregisterCommand( cmd );
	}
	for ( f in files ) {
		var file = files[ f ];
		delete require.cache[ require.resolve( cmdFolder + file ) ];
		try {
			require( cmdFolder + file );
		} catch( e ) {
			console.log( "Could not require " + file );
			console.log( e );
		}
		console.log( "Reloaded Command File: " + file );
	}
}

module.exports = {
	LoadBotCommands: LoadBotCommands,
	ReloadBotCommands: ReloadBotCommands
}