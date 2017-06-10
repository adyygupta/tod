var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//connect to database

mongoose.connect('mongodb://<dbusername>:<dbpassword>@ds033145.mlab.com:33145/todo');

//create schema

var todoSchema = new mongoose.Schema({
	item: String
});
var Todo = mongoose.model('Todo', todoSchema);


//var data = [{item: 'call for code'}, {item: 'pick mom'}, {item: 'pay charges'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app){
	app.get('/todo', function(req, res){
		//get data from mongodb and show
		Todo.find({}, function(err, data){
			if(err) throw err;
			res.render('todo', {todos: data});
		});
		
	});
	app.post('/todo', urlencodedParser, function(req, res){
		//get data from view and add data to mongo db
		var newTodo = Todo(req.body).save(function(err,data){
			if (err) throw err;
			res.json(data);
		});
	});
	app.delete('/todo/:item', function(req, res){
		//delete requested item from mongo db
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
			if(err) throw err;
			res.json(data);
		});
		
	});
	
}
