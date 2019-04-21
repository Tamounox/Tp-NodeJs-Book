var express    = require('express');        
var morgan = require('morgan');
var app        = express();                 
var port = process.env.PORT || 1337;        
app.use(require('./routes/index.routes'));
app.use(morgan('tiny'));
app.listen(port);
