var connect = require('connect');
var morganLogger = require('morgan');
var middleware = require('./modules/middleware');

var app = connect();
app.use(morganLogger());
//app.use('/', middleware.dumpRequest('.'));
//app.use('/', middleware.errorCreator);
//app.use('/', middleware.writeHeader('rd','rulez'));
app.use('/', middleware.echoMsg('The message\n', 1));
app.use(middleware.errorHandler)
app.listen(4040);
