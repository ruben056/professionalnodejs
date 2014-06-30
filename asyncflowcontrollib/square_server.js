var port = process.argv[2] && parseInt(process.argv[2]) || 8080;

require('http').createServer(function(req, resp){
  var receivedData = '';
  req.setEncoding('utf8');
  req.on('data', function(data){
      receivedData += data;
  });

  req.once('end', function(){
    if(receivedData)
    {
      var number = JSON.parse(receivedData);
      var squared = Math.pow(number,2);
      console.log(JSON.stringify(squared));
      resp.end(JSON.stringify(squared)+ '\n');
    }
    else
    {
      resp.end('Sample : curl --data 5 http://localhost:8080\n');
    }
  })
}).listen(port);
