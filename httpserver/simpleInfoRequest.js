var request = require('request');
var inspect = require('util').inspect;

request(
 'http://localhost:8080/abc/def',
 function(err, res, body){
  if(err){
   throw err;
  }
  console.log(inspect({
   err : err,
   res : {statusCode : res.statusCode},
   body: JSON.parse(body)
  }));
 }
);
