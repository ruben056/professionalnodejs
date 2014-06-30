var cp = require('child_process');

var childProcess = cp.spawn('node', ['plus_one.js']);
setInterval(function(){
    //create random number smaller then 1000
    var number = Math.floor(Math.random() * 10000);
    // write the number to the child process
    childProcess.stdin.write(number+"\n");
    // one time listener for data output events on childprocess
    childProcess.stdout.once('data', function(data){
      console.log('wheee child replied : ' + data);
    });
}, 1000);
childProcess.stderr.on('data',function(data){
    process.stderr.write('Error: ' + data);
});
childProcess.once('exit', function(exitCode){
  process.stdout.write("child process exited with exitcode " + exitCode);
});
