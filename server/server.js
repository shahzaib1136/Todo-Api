var { mongoose } = require('../server/db/mongoose');
var { ObjectID } = require('mongodb');

var { Todo } = require('../models/todoModel');
var { User } = require('../models/userModel');

var express = require('express');
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000;

// get all Todos

app.get('/allTodo', function (req, res) {

  Todo.find().then((doc) => {
    res.status(200).send(doc);
  }).catch((err) => {
    res.status(400).send(err);
  })
});

// save todo

app.post('/saveTodo', function (req, res) {
  var todoValue = {
    text: req.body.text,
    completed: req.body.complete,
    completedAt: req.body.completedAt
  }
  var newTodo = new Todo(todoValue);
  newTodo.save().then((doc) => {
    res.status(200).send(doc);
    console.log('data saved', JSON.stringify(doc, undefined, 2));
  }, (err) => {

    res.status(400).send(err);
  })
});

// delete todo

app.delete('/deleteTodo/:id', function (req, res) {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send('Id is not valid')
  }

  if (id) {
    Todo.findByIdAndRemove({ _id: id }, (err, data) => {
      if (err) {
        res.status(400).send(err);
      }
      else {
        res.status(400).send(data);
      }
    })
  }
  else {
    res.status(400).send('Id not Found')
  }

});

// update Todo by ID

app.patch('/saveTodo/:id', function (req, res) {
  var todoValue = {
    text: req.body.text,
    completed: req.body.complete,
    completedAt: req.body.completedAt
  }
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send('Id is not valid')
  }

  if (id) {
    Todo.findByIdAndUpdate({ _id: id }, todoValue, (err, data) => {
      if (err) {
        res.status(400).send(err);
      }
      else {
        res.status(400).send(data);
      }
    })
  }
  else {
    res.status(400).send('Id not Found')
  }
});

// get Todo by ID

app.get('/Todo/:id', function (req, res) {

  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send('Id is not valid')
  }

  if (id) {
    Todo.findById({ _id: id }, (err, data) => {
      if (err) {
        res.status(400).send(err);
      }
      else {
        res.status(400).send(data);
      }
    })
  }
  else {
    res.status(400).send('Id not Found')
  }
});

app.listen(port, () => console.log(`app listening on port ${port}!`))
