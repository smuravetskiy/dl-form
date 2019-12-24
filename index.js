const { writeFileSync, existsSync, mkdirSync } = require("fs");
const ics = require('ics');
const uuid = require('uuid');
const moment = require('moment');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

const formatDate = ({ start }) => {
  const m = new moment(start);
  return [
    m.year(),
    m.month(),
    m.date(),
    m.hour(),
    m.minute()
  ];
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const publicDir = 'public';

if (!existsSync(publicDir)) {
  mkdirSync(publicDir);
}

app.post('/', (req, res) => {
  const evts = req.body;

  const { error, value } = ics.createEvents(
    evts.map(evt => ({
      ...evt,
      start: formatDate(evt),
      duration: {
        hours: 1
      },
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
    }))
  );

  if (error) {
    res
      .status(400)
      .send(error);

    return
  }

  const fileName = `${uuid.v4()}.ics`;
  writeFileSync(`${__dirname}/${publicDir}/${fileName}`, value);

  res.send(fileName);
});

app.get('/public/:path', ({ params: { path } }, res) => res.download(`${__dirname}/${publicDir}/${path}`))
app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

app.listen(
  process.env.PORT,
  () => console.log(`Example app listening on port ${process.env.PORT}!`)
);
