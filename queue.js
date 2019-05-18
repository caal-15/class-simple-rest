const open = require('amqplib').connect('amqp://localhost');
const QUEUE_NAME = 'multiplication;'

module.exports = open.then(conn => {
  return conn.createChannel().then(ch => {
    return ch.assertQueue(QUEUE_NAME).then(() => {
      const sendToQueue = obj => {
        ch.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(obj)));
      }
      return { conn, ch, sendToQueue }
    });
  })
}).catch(err => console.log('Error connecting to queue', err))