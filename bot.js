const Discord = require('discord.js')
const client = new Discord.Client()
const https = require('https')

client.on('ready',()=>{
	console.log("Working & Online")
	setInterval(function() {
		var data='';
		
		var d = new Date();
			
		d.setMilliseconds(000);
		var endD=d.toISOString();
			
		d.setSeconds(d.getSeconds()-2);
		var startD=d.toISOString();
		
    		var options = 'https://www.bitmex.com/api/v1/trade?symbol=XBTUSD&count=500&start=1&reverse=false&startTime='+startD+'&endTime='+endD;
    		var request = https.request(options, function (res) {
				res.on('data', function (chunk) {
					data += chunk;
				});
				res.on('end', function () {
					var generalChannel = client.channels.get("600878121301966898") //QD
					//var generalChannel = client.channels.get("600017052366929921")
					var dArr = JSON.parse(data);
					console.log(dArr);
					var x=0;
					var sz=0;
					var c=0;
					for(i=0;i<dArr.length;i++)
					{
						if(dArr[i]['side']=='Buy' && (dArr[i]['price']>=10000))
						{
							x+=dArr[i]['price']
							sz+=dArr[i]['size']
							c++
						}
					}
					if(sz>=1000000)
					{
						console.log(x/c);
						console.log(sz);
						generalChannel.send(" :pampeet: " + " BitMEX XBTUSD **"+ sz +"** contracts market bought at **" + x/c + "**")
						
					}
				});
    		});
    		request.on('error', function (e) {
        		console.log(e.message)
    		});
    		request.end()  
  	},2000);
});

client.on('message',msg=>{
	/*if(msg.content === "Hello"){
		msg.reply("Hello0000000!")
	}*/
});

client.login(process.env.BOT_TOKEN)
