const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    'mongodb://mongo:27017/omm',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Monument = require('./models/Monument');

app.get('/', (req, res) => {
  Monument.find()
    .then(items => res.render('index', { items }))
    .catch(err => {
        console.error(err)
        res.status(404).json({ msg: 'No items found' })
    });
});

app.post('/monuments/add', (req, res) => {
  const newMonument = new Monument(req.body);

  newMonument.save().then(() => res.redirect('/'));
});

app.listen(port, () => console.log('Server running...'));