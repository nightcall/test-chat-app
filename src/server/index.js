import express from 'express';
import { MongoClient } from 'mongodb';

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  const db = client.db('chat-app');

  const app = express();
  const http = require('http').Server(app);
  const io = require('socket.io')(http);

  // HTTP
  app.use(express.static(__dirname + './../../public'));
  app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <html>
        <head>
        <meta charset='utf-8' />
        </head>
        <body>
          <div id='root'></div>
          <script src='/bundle.js'></script>
        </body>
      </html>
    `);
  });

  // SOCKETS
  io.on('connection', socket => {
    socket.on('SEND_MESSAGE', (message) => {
      db.collection('messages').insertOne(JSON.parse(message), (err, res) => {
        console.log(message);
      });

      // broadcast to all
      io.emit('RECEIVE_MESSAGE', message);
    });

    // retrieve convo
    socket.on('RETRIEVE_CONVERSATION', () => {
      db.collection('messages').find({}).toArray((err, results) => {
        console.log(results)
        socket.emit('RECEIVE_CONVERSATION', 'whole convo ma dude');
      });
    });
  });

  http.listen(8080);
  client.close();
});