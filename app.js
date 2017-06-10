var express = require('express');
var todocontroller = require('./Controller/todocontroller');


var app = express();
// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./ady'));

//fire controllers
todocontroller(app);

//listening to port
app.listen(3000);
console.log('you are listening to port 3000');