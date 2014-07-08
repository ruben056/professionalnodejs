var path = require('path');
var util = require('util');
var fs = require('fs');
// this one should only be used as the last function
// since it does not call the next();
module.exports.echoMsg = function(msg, closeConnection){
 return function(req, res){
  if(closeConnection){
    res.end('Last Msg:' + msg);  
  }else{
    res.write('Msg:' + msg);  
  }  
 }; 
};

// thse functions can be chained
module.exports.dumpRequest = function(dir){
 return function(req, res, next){
  var fileName = path.join(dir ,'dumps', Date.now().toString() + '_' + Math.floor(Math.random() * 100000) + '.txt');
  var file = fs.createWriteStream(fileName);
  file.write(req.method + ' ' + req.url + '\n');
  file.write(util.inspect(req.headers) + '\n');
  /*req.pipe(file);*/
  req.on('data', function(data){
    console.log(data);
    if(data == "quit"){
      res.end('Bye Bye!');
    }
  });
  req.on('end', function(data){
    console.log('connection ended');
  });
  next();
 }
}

module.exports.writeHeader = function(key, value){
 return function(req, res, next){
  res.setHeader(key, value);
  next();
 }
}

module.exports.errorCreator = function(req, res, err){
  throw new Error('This is an error');
};

module.exports.errorHandler = function(err, req, res, next){
  if(err){
    res.writeHead(500, {'Content-Type': 'text/html'});
    res.end('<h1>Oh no! We have an error!</h1>\n<pre>' + err.stack + '</pre>');
  }
  next();
};