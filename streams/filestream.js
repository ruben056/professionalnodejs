var fs = require('fs');
var options = function(){
  encoding : 'utf-8';
}
var number = 0;
var fileRS = fs.createReadStream('../output.txt', options);
fileRS.on('data', function(data){
  console.log('data:' + data);
  if(number==0)
  {
    fileRS.pause();
    number++;
    setTimeout(function(){
      fileRS.resume();
    }, 5000);
  }
});
fileRS.on('drain', function(data){
  console.log('stream was drained...');
});
