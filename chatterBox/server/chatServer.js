var connect = require('connect');
var allClients = [];

var httpChatServer = connect();
httpChatServer.use(function(req, res, next){
	console.log('client connected');
	res.writeHead(200, {'content-type': 'text/plain'});
	res.write('congratulations connected to chatterbox server');

	res.on('data', function(data){
		console.log('data: ' + data);
		if(data == 'quit'){
			allClients.splice(allClients.indexOf(res),1);
			res.end('Bye bye');
			allClients.forEach(function(client){
				if(client !== res){
					client.write('Someone left the conversation');
				}
				else{
					client.write('Bye Bye');
				}
			});
		}
		allClients.forEach(function(client){
			if(client !== res){
				client.write(data);
			}
		});		
	});

	res.on('end', function(){
		console.log('connection ended');
	});
	allClients.push(res);
})
httpChatServer.listen(4040);