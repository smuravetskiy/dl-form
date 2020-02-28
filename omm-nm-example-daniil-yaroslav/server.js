const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

app.get('/', function (req, res) {
  res.render('index')
});

app.get('/monuments/:id', function (req, res) {
  res.render('monuments')
});

app.get('/api/monuments', function (req, res) {
  Monument.find()
    .then(items => res.json(items))
    .catch(err => {
      res.status(500).send('Something Wrong!')
      console.log(err)
    });
});


app.get('/api/monuments/:id', function (req, res) {
  Monument
    .find({ _id: req.params.id })
    .then(item => res.json(item))
    .catch(err => {
      res.status(500).send('Something Wrong!')
      console.log(err)
    });
});

app.put('/api/monuments/:id', function (req, res) {
  Monument 
    .update({_id: req.params.id}, req.body)
    .then((item) => res.json(item))
    .catch(err => {
      res.status(500).json({message: `Something Wrong!:${err}`})
      console.log(err)
    })
});

app.post('/api/monuments', (req, res) => {
  const newMonument = new Monument(req.body);

  newMonument
    .save()
    .then((item) => res.json(item))
    .catch(err => {
      res.status(500).send('Something Wrong!')
      console.log(err)
    });
});

app.delete('/api/monuments/:id', function (req, res) {
  Monument
    .deleteOne({ _id: req.params.id })
    .then(() => res.send(200))
    .catch(err => {
      res.status(500).send('Something Wrong!')
      console.log(err)
    });
})

app.listen(port, () => console.log('Server running...'));