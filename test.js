// TEST CUSTOM LOADED MODULE
var circle = require('./module/circle'); // loading a file module by path
console.log('Area of circle with radius 2 = ' + circle(2).area());

var printer = require('./module/testmodule'); // loading a file module by path
printer.printA('Test1');
printer.printA('Test2');
printer.printB('Test3');

// TESTING EVENT EMITTERS
var events = require('events'); // loading node core module by name
var em = new events.EventEmitter();
em.emit('event1');
function myErrorListener(error){ // of not listening on error (cfr uncatched checked exception ==> error)
	console.log('Catched error');
}
em.on("error", myErrorListener);
em.emit('error', new Error('My mistake'));

em.removeListener('error', myErrorListener);
//em.emit('error', new Error('My mistake')); // will cause error stacktrace because not listern for 'error'

// create custom event emitter by inheriting from nodejs event emitter
var util = require('util');
var Ticker = function(){
	var self = this;
	var counter = 0;
	setInterval(function(){
		self.emit('tick', ++counter);
	}, 1000);
}
util.inherits(Ticker, events.EventEmitter);

var tickerInstance = new Ticker();
tickerInstance.on('tick', function(msg){
		console.log('tick ' + msg);
});


// TEST http server: curl http://localhost:8888
var http = require('http');
function onRequest(request, response) {
  	
   	console.log('Request received');
   	response.writeHead(200, {'Content-Type': 'text/plain'});
   	
   	tickerInstance.on('tick', function(msg){
   		response.write('tick' + msg + '\n');	
   		if(msg%10 == 0){
   			response.end();
   		}
	});
   	//response.end();
}
http.createServer(onRequest).listen(8888);

// test writing to file    
var fileUtil = require('./module/fileutil');
fileUtil.appendToFile('./output.txt'
   , 'Nog iets aan plakken'
   , function(err){
      if(err) throw err;
      console.log('appended no errors');
   });
