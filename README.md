# Bubbie's Bot Base
<p>This base was made to create Discord bots using the Eris library.<br>
Feel free to recreate or reverse engineer, as long as I'm credited.</p>

# Setup
<p>To use this bot, you will need to install <a href="https://nodejs.org/en/">node.js</a> and <a href="https://github.com/abalabahaha/eris">Eris</a>. If you've already done so, that's great.</p>
<p>After that, fill in all of the information in info.json.<br>
Replace the token value with your token, which can be found <a href="https://buttsare.sexy/6a06f1.png">in your bot's application page</a> for a bot account or in the <a href="https://buttsare.sexy/56cde9.png">Application tab of your developer tools</a> for a user account.</p>
<p>Then, make your way to the directory you saved the code in and run <b>node main</b> using your terminal. Voila.</p>

# Doing stuff
<p>This base comes with three commands: an eval command, a silent eval command and a reload command.<br>
All of these are in <b>/cmds/dev.js</b>, and you can modify them in any way you want.</p>

<p>All files in <b>/cmds/</b> will be loaded automatically, so you can create new files for your custom commands.</p>

<h3>Example Command</h3>
```
// ping.js //
var bot = require( "../bot.js" );

bot.registerCommand( "ping", function( msg, args ) {
	return "pong";
}, {
	description: "Replies with pong."
} );
```

<p>Additionally, you can read the <a href="https://abal.moe/Eris/docs">Eris docs</a>.</p>

# Useful Links
<a href="https://nodejs.org/en/">node.js</a><br>
<a href="https://nodejs.org/api/">node.js documentation</a><br>
<a href="https://www.tutorialspoint.com/nodejs/nodejs_introduction.htm">Learn node.js</a><br>
<a href="http://www.wikihow.com/Develop-Common-Sense">Develop Common Sense</a><br>
<a href="https://discord.gg/zFVnWcq">Discord API Server</a><br>
<a href="https://abal.moe/Eris/doc">Eris Documentation</a><br>
<a href="https://github.com/meew0/discord-bot-best-practices">Recommended Practices</a><br>
