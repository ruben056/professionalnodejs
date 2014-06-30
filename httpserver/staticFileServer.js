'use strict';

var path = require('path');
var fs = require('fs');

require('http').createServer(function(req, res){
    var file = path.normalize('.'+ req.url);
    console.log('serving ' + file + '...');

    fs.exists(file, function(exists){
      if(!exists){
        res.writeHead(404);
        res.end('File ' + file + ' not found on server\n');
        return;
      }

      // actually serve the file
      fs.stat(file, function(err, stat){
        if(err){
          reportInternalServerError(err, res)
          return;
        }

        if(stat.isDirectory()){
          reportIsDirectory(res, file);
          return;
        }


        var stream = fs.createReadStream(file);
        stream.on('error', function(error){
          reportInternalServerError(error, res)
        });

        stream.pipe(res);
      });
    });
}).listen(8080);

(function reportInternalServerError(err, res){
  console.log("error: " + err);
  res.writeHead(500);
  res.end('Internal error occurred ' + err +'\n');
});

(function reportIsDirectory(res, file){
  console.log(file + ' is a directory and cannot be served!');
  res.writeHead(403);
  res.end('File ' + file + ' is a directory and cannot be served!!\n');
});
