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
  // Вопрос : Нужно ли проверить id?
  // Ответ : Нужно , т.к. пользователь может указать путь к объекту через адресную строку , но при указании неверного id сообщение уже выводится (пример : Something Wrong!:CastError: Cast to ObjectId failed for value "5e6502570f64e00024063c1agg" at path "_id" for model "monument")
  // Вопрос : Нужно ли проверить есть ли name внутри req.body?
  // Ответ : Нужно , т.к. name является обязательным для любого объекта
  const name = req.body.name
  const validator = new Validate(name)
  console.log(name)
  console.log(validator)
  if (!validator
      .isNotEmpty()
      .isValid) {
    res.status(500).send('It should be some name in "Name"!')
    return
  }
  Monument 
    .update({_id: req.params.id}, req.body)
    .then((item) => res.json(item))
    .catch(err => {
      res.status(500).send(`Something Wrong!:${err}`)
      console.log(err)
    })
  console.log(req.body)
  console.log(req.params)
});

app.post('/api/monuments', (req, res) => {
  // Вопрос : Нужно ли проверить есть ли name в req.body?
  // Ответ : Для данного случая , я считаю это необязательным , т.к. в папке models находится файл Monument.js 
  //         в котором есть строчка кода , которая обязывает пользователя ввести что-то в поле name , в поле name могут попадать как цифры так и буквы
  // Вопрос : Нужно ли проверить правильного ли формата дата которую мы передаем?
  // Ответ : На данном этапе своих познаний , считаю необязательным проверку даты (т.к. дату в данной форме нельзя задать несуществующей), но подозреваю есть "подводные камни"
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
  // Ответ : не нужно , т.к. пользователя не переадресовывают на другую страницу + пользователь не указывает id вручную , а кликает на кнопку , к которой уже привязан id
  //         Если изначально в коде всё привязано верно , то не вижу вариантов разваития событий , когда удалился бы другой id 
  Monument
    .deleteOne({ _id: req.params.id })
    .then(() => res.send(200))
    .catch(err => {
      res.status(500).send('Something Wrong!')
      console.log(err)
    });
})

app.listen(port, () => console.log('Server running...'));