var express = require('express');
var session = require('cookie-session'); // sessions' middleware
var bodyParser = require('body-parser'); // management for parameters middleware

var urlencodedParser = bodyParser.urlencoded({extended: false});

var app = express();

app.use(session({secret: 'todosecret'}));

// if no todolist in the session, create one
app.use(function(req, res, next) {
    if (typeof(req.session.todolist) === 'undefined') {
        req.session.todolist = [];
    }
});

// display todolist and form
app.get('/todo', function(req,  res) {
    res.render('todo.ejs', {todolist: req.session.todolist});
});

// add element to the todolist
app.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo !== '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
});

// delete an element from the todolist
app.get('/todo/delete/:id', function(req,res) {
    if (req.params.id !== '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
});

// redirect every other paths that don't exist
app.use(function(req, res, next) {
    res.redirect('/todo');
});

app.listen(3389);