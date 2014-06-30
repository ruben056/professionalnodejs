var fs = require('fs');
var tls = require('tls');
var options = {
  key: fs.readFileSync('./my_key.pem'),
  cert: fs.readFileSync('./my_cert.pem'),
  //use the certificate as ca to get authorized...
  // TODO generate certificate with ip and hostname for localhost
  ca: [fs.readFileSync('./my_cert.pem')],
  rejectUnauthorized: false // for now allow unauthorized ... at least it is encrypted
};
var host = 'localhost', port=8080;

var client = tls.connect(port,host,options,function(){

  client.setEncoding('utf8');
  client.on('error', function(err){
    console.log('Error : ' + err);
  });

  process.stdin.pipe(client, {end: false});
  client.pipe(process.stdout);

  if (client.authorized)
  {
    console.log("Connection authorized by a Certificate Authority.");
  }
  else
  {
    console.log("Connection not authorized by CA: " + client.authorizationError);
  }
});
