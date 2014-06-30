process.stdin.resume();
process.stdin.on('data', function(data){

  try{
    var number = parseInt(data.toString(), 10);
    number += 1;
    process.stdout.write("number: " + number);
  }catch(err){
    process.stderr.write("something obviously went really really wrong:" + number);
  }
});
