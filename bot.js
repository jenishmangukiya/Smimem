const Discord = require('discord.js');
const bot = new Discord.Client();
const https = require('https');

bot.on('ready',()=>{
	console.log("Working & Online");
	var data='';
	setInterval(function() {
    		var options = 'https://www.bitmex.com/api/v1/trade?symbol=XBTUSD&side=buy&count=500&start=0&reverse=true';
    		var request = https.request(options, function (res) {
			res.on('data', function (chunk) {
				data += chunk;
			});
			res.on('end', function () {
				bot.on('message',msg=>{
					const channel = 'general';
					if (!channel) return;
					 // Send the message, mentioning the member
					 channel.send(data);
				});
				console.log(data);
			});
    		});
    		request.on('error', function (e) {
        		console.log(e.message);
    		});
    		request.end();     
  	},30000);
});

bot.on('message',msg=>{
	if(msg.content === "Hello"){
		msg.reply("Hello0000000!");
	}
});

bot.login(process.env.BOT_TOKEN);
