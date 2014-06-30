var fs = require('fs');
require('http').createServer(function(req, res) {
  var rs = fs.createReadStream('../output.txt');
  rs.pipe(res); // this solves to slow client probem ... see profession node js page  80
}).listen(8080);

// slow clien tproblem explanation:
// when data for instance form the filestream is read fast and the connection
// to the server is slow, nodejs will start buffering.
// this can end up using a lot of memory.
// the pipe function solves this by pausing the inputstream when the kernel buffer is full
// and resuming the inputstream when the outputstream is drained.
