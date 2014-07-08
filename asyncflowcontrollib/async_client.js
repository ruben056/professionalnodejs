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

// QUEUE
// when you want to controle how many concurrent jobs can run
// the results will NOT be ordered in the order of the queue!!
var maxConcurrency = 5;
var queue = async.queue(squareViaServer, maxConcurrency);
[1,2,3,4,5,6,7,8,9,10].forEach(function(curNr){
  queue.push(curNr, function(err, result){
    if(err)
      throw err;
    console.log(curNr + '^2 = %d', result);
  })  
});
queue.saturated = function(){
  console.log("Queue is satured");
}
queue.empty = function(){
  console.log("Last item in queue past to worker");
}
queue.drain = function(){
  console.log("Worker finished last item in queue");
}

// TODO FOREACH DOESNT SEEM TO GIVE THE RESULTS I WANT...
// TODO : DEBUG WHEN HAVING THE TIME
// see professional nodejs page 190
// async foreach:
// basically the functionality per iteraiton is done async...
var collection = [1,2,3,4,5];
var results = {};
async.forEach(collection, squareViaServer, function(err, results){
  if(err){
    throw err;
  }
  console.log('results foreach : %j', results);
});
// variant that executs logic asynchronously but not parallel with each other
// this is usefull for example when B depends on result of A etc...
async.forEachSeries(collection, squareViaServer, function(err, results){
  if(err){
    throw err;
  }
  console.log('results foreachSeries : %j', results);
});


async.map([22,24], squareViaServer, done);