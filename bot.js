const Discord = require('discord.js');
const bot = new Discord.Client();
const https = require('https');

bot.on('ready',()=>{
	console.log("Working & Online");
	
});

bot.on('message',msg=>{
	if(msg.content === "Hello"){
		msg.reply("Hello!");
	}
	setTimeout(msg.reply("1"),20000);
});

bot.login(process.env.BOT_TOKEN);
