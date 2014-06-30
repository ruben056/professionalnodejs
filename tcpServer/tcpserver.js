//Simple tcp server that
//1. pipes all incoming data to the tcpdump.txt file
//2. pipes a welcom message from a file to the client upon connection
//3. ends connection when 'quit!' is received
//4. when recieving a msg it is broadcasted to other connected sockets
// to test use netcat: nc localhost 8080
// or telnet : telnet localhost 8080
var fs = require('fs');

var allClientSockets = [];
var server = require('net').createServer(function(socket){

  allClientSockets.push(socket);
  console.log("Connection received");
  socket.setEncoding('utf-8');

  // pipe welcome message to client but do not close socket stream!
  fs.createReadStream('welcome.txt').pipe(socket, {end:false});

  socket.pipe(fs.createWriteStream('tcpdump.txt'));
  socket.on('data', function(data){
    console.log("broadcasting data:" + data);
    if(data.trim() == 'quit!')
    {
      socket.write('Bye bye!\n');
      socket.end();
    }
    allClientSockets.forEach(function(curSocket){
      if(curSocket !== socket)
      {
        curSocket.write(data);
      }
    });
  });
  socket.on('end', function(data){
    console.log("connection ended");
    allClientSockets.splice(allClientSockets.indexOf(socket), 1);
  });
  socket.on('error', function(error){
    console.log("error occured : " + error);
  });

}).listen(8080);
