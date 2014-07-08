var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.get('/2', function(req, res) {
  res.send('users/2');
});

module.exports = router;
