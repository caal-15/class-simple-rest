const express = require('express');
const db = require('./database');
const cors = require('cors');
const morgan = require('morgan');

const multiplicationsRepository = require('./repositories/multiplications')(db);

require('./queue').then(({ conn, sendToQueue }) => {
  process.on('exit', () => {
    db.destroy();
    conn.close();
  });

  const multiplicationRouter = require('./routes/multiplications')(
    multiplicationsRepository,
    sendToQueue
  );

  const app = express();

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  app.use('/multiplications', multiplicationRouter);

  app.listen('8080', () => {
    console.log('App Listening on port 8080');
  });
});
