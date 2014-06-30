var util = require('util');
require('http').createServer(function(req, res){
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('Hello there!');
    res.write('headers:\n' + util.inspect(req.headers));
    res.end('Disconnecting...');
}).listen(8080);
