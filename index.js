const { writeFileSync } = require("fs");
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
  }

  const fileName = uuid.v4();
  writeFileSync(`${__dirname}/${fileName}.ics`, value);

  res
    .status(200)
    .sendFile(fileName);
});

app.listen(
  process.env.PORT,
  () => console.log(`Example app listening on port ${process.env.PORT}!`)
);
