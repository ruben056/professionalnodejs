var tls = require('tls');
var fs = require('fs');

var serverOptions = {
  key: fs.readFileSync('./my_key.pem'),
  cert: fs.readFileSync('./my_cert.pem')
};

var server =  tls.createServer(serverOptions);
server.on('secureConnection', function(clientStream){
  clientStream.setEncoding('utf8');
  console.log('client connection ...');
  clientStream.write('Welcome to this secure server!');
  clientStream.on('data', function(data){
    console.log(data.trim());
    if(data.trim() == 'quit'){
      console.log('client disconnecting...');
      clientStream.end('Bye Bye!\n');
    }
  });
});
server.listen(8080);
