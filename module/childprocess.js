var cp = require('child_process');
var exec = cp.exec;
var util = require('util');
var events = require('events');

exec('sleep 5 && cat *.js | wc -l', function(err, stdout, stderr){
	if(err){
		throw err;
	}
	console.log(stdout);
});

// console.log("This is shown before the result of the command triggered above");
// (function schedule(){
// 	setTimeout(function(){
// 		console.log('.');
// 		schedule();
// 	}, 1000);
// })();

//TODO spawning stuff

var spawn = cp.spawn;
var child = spawn('ls');
child.stdout.on('data', function(dataBuffer){
	console.log(dataBuffer.toString());
});
child.on('exit', function(code){
	console.log('child process terminated ... : ' + code);	
});
