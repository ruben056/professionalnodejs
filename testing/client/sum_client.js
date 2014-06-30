var request = require('request');


function sum(a, b, callBack){

  var options = {
    uri :'http://localhost:8080',
    qs : {
      a : a,
      b : b
    }
  };

  request(options, function(error, response, body){
    var result;
    if(error){
      return callBack(error);
    }
    try{
      result = JSON.parse(body);
    }catch(error){
      callBack(error);
    }
    return callBack(null, result);
  });
}

module.exports = sum;
