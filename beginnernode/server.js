var http = require('http');
var url = require('url');
function start(route){
  function onRequest(request, response){
    response.writeHead(200, {'content-type': 'text/plain'})
    response.write('Hello there!');
    var pathName = url.parse(request.url).pathname;
    // var qryString = url.parse(request.url).query;
    // response.write('web context :' + pathName + '\nqryString : ' + qryString);
    route(pathName);
    response.end(); //close the connection otherwise it stays open
  }
  http.createServer(onRequest).listen(8080);
  console.log('Server has started ... ');
}
exports.start = start;
