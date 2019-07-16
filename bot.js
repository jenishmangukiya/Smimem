const Discord = require('discord.js')
const client = new Discord.Client()
const https = require('https')

client.on('ready',()=>{
	console.log("Working & Online")
	setInterval(function() {
			var data='';
    		var options = 'https://www.bitmex.com/api/v1/trade?symbol=XBTUSD&side=buy&count=500&start=0&reverse=true';
    		var request = https.request(options, function (res) {
				res.on('data', function (chunk) {
					data += chunk;
				});
				res.on('end', function () {
					var generalChannel = client.channels.get("579297644178833424")
					//generalChannel.send(data)
					var dArr = JSON.parse(data);
					for(i=0;i<dArr.length;i++)
					{
						if(dArr[i]['size']>=1000000)
						{
							generalChannel.send(":pampeet: " + "[" + dArr[i]['timestamp'] +"] BitMEX "+ dArr[i]['symbol'] +" **"+ dArr[i]['size'] +"** contracts market sold at **" + dArr[i]['price'] + "**")
						}
					}
				});
    		});
    		request.on('error', function (e) {
        		console.log(e.message)
    		});
    		request.end()  
  	},5000);
});

client.on('message',msg=>{
	if(msg.content === "Hello"){
		msg.reply("Hello0000000!")
	}
});

client.login(process.env.BOT_TOKEN)
