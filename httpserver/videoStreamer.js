/**
for some reason i get corrupt file or something on firefox
when using curl the file downloads fine ... dunno ...
in chromium it just doesn' play...
*/
var fs = require('fs');
require('http').createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'video/mp4'});
  var rs = fs.createReadStream('skatemovie.mp4');
  rs.pipe(res);
}).listen(8080);
