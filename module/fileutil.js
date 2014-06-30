var path = require('path');
var s = path.join('bla','subfolder','nognefolder');
var s2 = path.join('bla/','/subfolder/','/nognefolder');
console.log(s);
console.log(s2);
if(s === s2){
	console.log('paths are normalized');
}

var s3 = path.join('bla/','/subfolder/','/nognefolder','nefile.html');
console.log('DirName = ' + path.dirname(s3));
console.log('FileName = ' + path.basename(s3));
console.log('FileName = ' + path.basename(s3, '.html'));


var fs = require('fs');
fs.exists('/home/ruben', function(exists){
	console.log(exists);
});
fs.exists('/etc/passwd', function(exists){
	console.log(exists);
	fs.stat('/etc/passwd', function(err, stats){
		if(err){
			throw err
		}
		console.log(stats);
		// fs.open('./fileutil.js', 'r', function(err, fd){
		// 	if(err)
		// 		throw err;

		// 	var readBuffer = new Buffer(1024)
		// 	, bufferOffset = 0
		// 	, bufferLength = readBuffer.lengt
		// 	, filePos = 100;

		// 	fs.read(
		// 		fd
		// 		,readBuffer
		// 		,bufferOffset
		// 		,bufferLength,
		// 		filePos,
		// 		function read(err, readBytes){
		// 			console.log('readbytes : ' + readBytes);
		// 			if(err)
		// 				throw err;
		// 			if(readBytes > 0){
		// 				console.log(readBuffer.slice(0, readBytes));
		// 			}
		// 		})
		// });
	});
});

console.log('en nu ...');
fs.open('./output.txt', 'a',function(err, fd){
	console.log('......');
	if(err){
		fs.close(fd);
		throw err;
	}

	console.log("Prepare writing ...");
	var writeBuffer = new Buffer('Content to go into the file'),
	bufferPos = 0, bufferLength = writeBuffer.length, filePosition = null;
	console.log("Writing ...");
	fs.write(fd, writeBuffer, bufferPos, bufferLength, filePosition,
		function(err, writtenBytes){
			if(err){
				fs.close(fd);
				console.log("ERROR="+ err);
				throw err;
			}
			console.log('wrote' + writtenBytes + 'bytes');
			fs.close(fd);
		});
});
console.log('Test ended');

module.exports.appendToFile = function (filePath, someText, callback) {
		var writeBuffer = new Buffer('\n' + someText + ' \n');
		filePath = path.normalize(filePath);
		fs.open(filePath, 'a', function opened(err, fd) {
			if (err) { return callback(err); }
			function notifyError(err) {
				fs.close(fd, function() {
				callback(err);
			});
		}
		var bufferOffset = 0,
		bufferLength = writeBuffer.length,
		filePosition = null;
		fs.write( fd, writeBuffer, bufferOffset, bufferLength, filePosition,
			function wrote(err, written) {
				if (err) { return notifyError(err); }
				fs.close(fd, function() {
					callback(err);
				});
			});
		});
	};
