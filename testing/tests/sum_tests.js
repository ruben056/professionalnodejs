var sum = require('../client/sum_client');
var test = require('tap').test;

test('sum 3 and 4', function(t){
    sum(3,4,function(error, result){
      t.notOk(error, 'no error');
      t.equal(result, 7, '3+4=7');
      t.end();
    });
});

test('sum 2 and 1', function(t){
    sum(2,1,function(error, result){
      t.notOk(error, 'no error');
      t.equal(result, 3, '2+1=3');
      t.end();
    });
});
