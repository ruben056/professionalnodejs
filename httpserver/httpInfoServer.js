require('http').createServer(function(req, res){

 function printBack(){
  res.writeHead(200, {'content-type':'text/plain'});
  res.end(JSON.stringify({
   url : req.url,
   method : req.method,
   headers : req.headers
  }));
 }

 switch(req.url){
  case'/redirect':
   res.writeHead(301, {'Location' : '/'});
   res.end('..redirecting...');
   break;
  case'/print/body':
   var body = '';
   req.setEncoding('utf8');
   req.on('data', function(data){
    body += data;
   });
   req.on('end', function(){
    res.write(JSON.stringify(body));
   })
   break;
  default:
   printBack();
   break;
 }
}).listen(8080);
