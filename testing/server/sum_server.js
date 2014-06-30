var url = require('url');
var util = require('util');

require('http').createServer(function(req,res){
  // the true here indicates we use querystring module to parse the url
  var params = url.parse(req.url, true).query;
  var a = parseInt(params.a, 10);
  var b = parseInt(params.b, 10);
  var result = a + b ;
  res.writeHead(200, {'content-type' : 'text/plain'});
  res.end(JSON.stringify(result) + '\n');
}).listen(8080);
