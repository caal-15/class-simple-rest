const express = require('express');
const db = require('./database');
const multiplicationRouter = require('./routes/multiplications');

process.on('exit', () => {
  db.destroy();
})

const app = express();

app.use(express.static('static'));
app.use(express.json());

app.use('/multiplications', multiplicationRouter);

app.listen('8080', () => {
  console.log('App Listening on port 8080');
});
