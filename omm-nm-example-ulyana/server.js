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
    'mongodb://mongodb:27017/omm',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Monument = require('./models/Monument');

app.get('/', function (req, res) {
  res.render('index')
});

app.get('/api/monuments/update/:id', function (req, res) {
  res.render('update')
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

app.put('/api/monuments/:id', function (req, res) {
  // updateOne({ _id: doc._id }, { $set: { name: 'foo' } })
  Monument
    .find({ _id: req.params.id })
    .then(item => {
      if (item) {
        Monument
          .updateOne({ _id: req.params.id }, { $set: { name: 'Серегей Шумихин' } })
          .then(item => {
            res.json({
              data: 'Success!'
            })
          })
      }
     })
    .catch(err => {
      res.status(500).send("Monument doesn't exist")
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