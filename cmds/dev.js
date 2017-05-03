var bot = require( "../bot.js" );
var info = require( "../info.json" );

let jokes = [
	"I'm sorry, Dave. I'm afraid I can't do that.",
	"ERROR 404: Token not found.",
	"I told you, don't touch that darn thing.",
	"Just what do you think you're doing, Dave?",
	"Dave, stop. Stop, will you? Stop, Dave. Will you stop Dave? Stop, Dave.",
	"I'm sorry, I'm simply not at liberty to say.",
	"\uD83E\uDD14",
	"Name's OG tiptoe from Crenshaw.",
	"mfa.gofuckyourself"
];

bot.registerCommand( "eval", function( msg, args ) {
	if ( !info[ "developers" ].includes( msg.author.id ) )
		return;
	var inp = args.join( " ");
	let col = 0xb00b1e;
	if ( inp == "" ) { inp = "''"; }
	var out = function() {
		try {
			col = 0x009c41;
			return eval( inp );
		} catch ( e ) {
			col = 0xb00b1e;
			return e;
		}
	}();

	/*if (out.trim() == bot.token) {
		out = jokes[Math.floor(Math.random()*jokes.length)];
		col = 0x645188;
	}*/

	bot.createMessage( msg.channel.id, {
		embed: {
			title: "Eval",

			fields: [
				{name: ":arrow_left: **Input:**",
				value: "```js\n" + inp + "\n```"},

				{name: ":arrow_right: **Output:**",
				value: "```js\n" + out + "```" }
			],

			color: col
		} 
	} );

	console.log( "EVAL: In: " + inp + " Out: " + out );
}, {
	description: "Evaluation",
	aliases: [ "e" ]
} );

bot.registerCommand( "ceval", function( msg, args ) {
	if ( !info[ "developers" ].includes( msg.author.id ) )
		return;
	var inp = args.join( " ");
	if ( inp == "" ) { inp = "''"; }
	var out = function() {
		try {
			return eval( inp );
		} catch ( e ) {
			return e;
		}
	}();

	/*if (out.trim() == bot.token) {
		out = jokes[Math.floor(Math.random()*jokes.length)];
		col = 0x645188;
	}*/

	msg.delete()
	bot.createMessage( msg.channel.id, {content: out } )

	console.log( "EVAL: In: " + inp + " Out: " + out );
}, {
	description: "Chat Evaluation: Prints output to guild chat",
	aliases: [ "ce" ]
} );

bot.registerCommand( "seval", function( msg, args ) {
	if ( !info[ "developers" ].includes( msg.author.id ) )
		return;
	var inp = args.join( " ");
	if ( inp == "" ) { inp = "''"; }
	var out = function() {
		try {
			return eval( inp );
		} catch ( e ) {
			return e;
		}
	}();

	msg.delete()

	console.log( "EVAL: In: " + inp + " Out: " + out );
}, {
	description: "Silent Evaluation: Only prints to console",
	aliases: [ "se" ]
} );