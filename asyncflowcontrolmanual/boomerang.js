var fs = require('fs');
function append_some_a_to_b(callback) {
  fs.open(__dirname + '/a.txt', 'r', function(err, aFd) {
    if (err) {
      return callback(err);
    }
    var buffer = new Buffer(10);
    fs.read(aFd, buffer, 0, buffer.length, 0, function(err) {
      if (err) {
        return callback(err);
      }
      fs.close(aFd, function(err) {
        if (err) {
          return callback(err);
        }
        fs.open(__dirname + '/b.txt', 'a', function(err, bFd) {
          if (err) {
            return callback(err);
          }
          fs.fstat(bFd, function(err, bStats) {
            if (err) {
              return callback(err);
            }
            startPos = bStats.size;
            fs.write(bFd, buffer, 0, buffer.length, startPos, function(err) {
              if (err) {
                return callback(err);
              }
              fs.close(bFd, callback);
            });
          });
        });
      });
    });
  });
}

function append_some_a_to_b2(callback) {
  var aFd, bFd, buffer = new Buffer(10);
  function open_a(){
      fs.open(__dirname + '/a.txt', 'r', read_from_a);
  }

  function read_from_a(err, fd){
    if(err){
      return callback(err);
    }
    aFd = fd;
    fs.read(aFd, buffer, 0, buffer.length, 0, close_a);
  }

  function close_a(err){
    if(err){
      return callback(err);
    }
    fs.close(aFd, open_b)
  }

  function open_b(err){
    if(err){
      return callback(err);
    }
    fs.open(__dirname + '/b.txt', 'a', stat_b);
  }

  function stat_b(err, fd){
    if(err){
      return callback(err);
    }
    bFd = fd;
    fs.fstat(bFd, write_b);
  }

  function write_b(err, bStats){
    if(err){
      return callback(err);
    }

    startPos = bStats.size;
    fs.write(bFd, buffer, 0, buffer.length, startPos, close_b);
  }

  function close_b(err){
    if(err){
      return callback(err);
    }
    fs.close(bFd, callback);
  }

  open_a();
}

// third way:
function append_some_a_to_b3(callback) {
  var aFd, bFd,
  buffer = new Buffer(10);
  cascade([
    function open_a(next) {
      fs.open(__dirname + '/a.txt', 'r', next);
    },
    function read_from_a(fd, next) {
      aFd = fd;
      fs.read(aFd, buffer, 0, buffer.length, 0, next);
    },
    function close_a(bytesRead, buf, next) {
      fs.close(aFd, next);
    },
    function open_b(next) {
      fs.open(__dirname + '/b.txt', 'a', next);
    },
    function stat_b(fd, next) {
      bFd = fd;
      fs.fstat(bFd, next);
    },
    function write_b(bStats, next) {
      fs.write(bFd, buffer, 0, buffer.length, bStats.size, next);
    },
    function close_b(bytesWritten, buf, next) {
      fs.close(bFd, next);
    }
  ], callback);
}

/*
This genious piece of code :), uses a function (processnext)
to glue all the other functions together, ending with the callback(2nd arg)
This "glue function" also performs the common task of errorhandling and
removes the err from the arguments before passing the arguments to the next function.

so exectution is something like:
processNext -> callbacks[0] -> processNext -> callbacks[1] -> processNext
-> callbacks[n] -> ... -> ... ->processNext -> callback.

*/
function cascade(callbacks, callback) {

  var functions = callbacks.slice(0);
  function processNext(err){
    if(err){
      return callback(err);
    }
    // clone args array
    var args = Array.prototype.slice.call(arguments);
    var curFunc = functions.shift();
    args.shift(); // remove the err argument

    if(!curFunc)
    {
      curFunc = callback; // last function ends with triggering callback;
    }
    else
    {
      args.push(processNext);
    }

    curFunc.apply(null, args);
  }

  processNext.call(null);
}


console.log('starting...');
append_some_a_to_b3(function(err) {
  if (err) {
    throw err;
  }  
  console.log('done');
});
