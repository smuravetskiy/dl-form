const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Validate = require('./utils/validate')

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    'mongodb://mongo:27017/omm',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Monument = require('./models/Monument');

// render
app.get('/', function (req, res) {
  res.render('index')
});

app.get('/update/:id',function (req, res) {
  res.render('update', {id: req.params.id})
});

app.get('/create',function (req, res) {
  res.render('create')
});


// API
app.get('/api/monuments', function (req, res) {
  Monument.find()
    .then(items => res.json(items))
    .catch(err => {
      res.status(500).send('Something Wrong!')
      console.log(err)
    });
});

app.get('/api/monuments/:id', function (req, res) {
  const id = req.params.id
  
  // Пример использования валидатора для проверки id на корректность
  const validator = new Validate(id)

  if (!validator
      .isMongoID()
      .isValid) {
    // если id не корректный нам нужно вернуть ошибку
    res.status(500).send('id should be mongoID!')
    // и прервать выполнение функции
    return
  }

  Monument
    .find({ _id: id })
    .then(item => res.json(item[0]))
    .catch(err => {
      res.status(500).send('Something Wrong!')
      console.log(err)
    });
});

app.put('/api/monuments/:id', function (req, res) {
  // нужно ли проверить id?
  // нужно ли проверить есть ли name внутри req.body?
  Monument 
    .update({_id: req.params.id}, req.body)
    .then((item) => res.json(item))
    .catch(err => {
      res.status(500).send(`Something Wrong!:${err}`)
      console.log(err)
    })
});

app.post('/api/monuments', (req, res) => {
  // нужно ли проверить есть ли name в req.body?
  // нужно ли проверить правильного ли формата дата которую мы передаем?
  const newMonument = new Monument(req.body);

  newMonument
    .save()
    .then((item) => res.json(item))
    .catch(err => {
      res.status(500).send(`Something Wrong! ${err}`)
      console.log(err)
    });
});

app.delete('/api/monuments/:id', function (req, res) {
  // нужно ли проверить id?
  Monument
    .deleteOne({ _id: req.params.id })
    .then(() => res.send(200))
    .catch(err => {
      res.status(500).send('Something Wrong!')
      console.log(err)
    });
})

app.listen(port, () => console.log('Server running...'));