var cp = require('child_process');
// Spawn the child with a "sleep 10" command
var child = cp.spawn('sleep', ['10']);
setTimeout(function() {
  child.kill();
}, 1000);
child.on('exit', function(code, signal) {
  if (code) {
    console.log('child process terminated with code ' + code);
  } else if (signal) {
    console.log('child process terminated because of signal ' + signal);
  }
});
