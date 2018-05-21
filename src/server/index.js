import express from 'express';

/*
import { MongoClient } from 'mongodb';

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  const db = client.db('chat-app');
 
  client.close();
});*/

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
    console.log(message);
    io.emit('RECEIVE_MESSAGE', message);
  });
});

http.listen(8080);