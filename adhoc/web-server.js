var http = require('http');
http.createServer(function(req, res){
 res.writeHead(200, {'content=type' : 'text/plain'});
 res.write('hello world\n');
 res.end('Bye bye!!!\n');
}).listen(8080);
