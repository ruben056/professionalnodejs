var async = require('async');
var request = require('request');

function done(err, results){
  if(err){
    throw err;
  }
  console.log('results : %j', results);
}

function squareViaServer(baseNr, next){
  request.post({uri: 'http://localhost:4040', body : JSON.stringify(baseNr)},
    function(err, res, body){
      result = body && JSON.parse(body);
      next(err, result);
    }
  );
}

// SERIES
async.series([
  function(next){
    squareViaServer('4', next);
  },
  function(next){
    squareViaServer('5', next)
  }],  done);

/**
PARALLEL
The results are in the order the functions are passed here
But on the server (if you log) you can see that the square of 5 is calculated last.
*/
async.parallel([
  function(next){
    squareViaServer('4', next);
  },
  function(next){
    setTimeout(function(){squareViaServer('5', next)}, 4000);
  },
  function(next){
    squareViaServer('6', next)
  },
  function(next){
    squareViaServer('7', next)
  }],  done);


// CASCADE / WATERFALL: output of one function is used as in put for next function
// (except for err argument)
async.waterfall([
  function(next){
    request.post({uri: 'http://localhost:4040', body : '3'}, next);
  },
  function(res, body, next){
    request.post({uri: 'http://localhost:4040', body : body}, next);
  }],
  function(err, res, body){
    if(err){
      throw err
    }
    console.log("3^4 : %d", body);
  });
