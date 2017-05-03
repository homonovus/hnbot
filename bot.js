const Eris = require( "eris" );
var info = require( "./info.json" );

var bot = new Eris.CommandClient( info[ "token" ], {}, {
	owner: info[ "owner" ],
	prefix: [ info[ "prefix" ], "@mention" ],
	defaultHelpCommand: false,
	ignoreSelf: true, // Set to false if you want to use a selfbot
	/*defaultCommandOptions: {
		requirements: { userIDs: info[ "id" ] }
	}*/// Uncomment this out if you want to use a selfbot
} );

module.exports = bot;
