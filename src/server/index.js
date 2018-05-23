import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  const db = client.db('chat-app');
  const app = express();
  const http = require('http').Server(app);
  const io = require('socket.io')(http);

  // HTTP
  app.use(express.static(__dirname + './../../public'));
  app.use(bodyParser.json());

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

  app.post('/signup', (req, res) => {
    const {
      username,
      password
    } = req.body;
    res.setHeader('Content-Type', 'application/json');
    console.log(`User requested to sign up with username = ${username}`);

    // test username requested
    db.collection('users').findOne({name: username}, (err, result) => {
      
      // username already exists
      if(result)
        res.end(JSON.stringify({error: `${username} is already taken.`}));
      else if(!password || password === '')
        res.end(JSON.stringify({error: `Password not correct`}));
      else {
        // add user to DB
        db.collection('users').insertOne({
          name: username,
          password: password
        }, (err, response) => {
          // ALL GOOD 
          console.log('User created !')
          res.end(JSON.stringify({}));
        });
      }
    });
  });

  app.post('/login', (req, res) => {
    const {
      username,
      password
    } = req.body;
    res.setHeader('Content-Type', 'application/json');
    console.log(`User requested to login with username=${username}, password=${password}`);

    // test username requested
    db.collection('users').findOne({name: username, password: password}, (err, result) => {
      
      // OK
      if(result) {
        console.log(result);
        res.end(JSON.stringify(result));
      } else {
        console.log('Invalid username/password');
        res.end(JSON.stringify({error: 'Invalid username/password'}));
      }
    });
  });

  // SOCKETS
  io.on('connection', socket => {
    socket.on('RETRIEVE_ROOMS_LIST', () => {
      console.log('retrieving rooms list...');
      db.collection('rooms').find({}).toArray((err, result) => {
        setTimeout(() => socket.emit('RECEIVE_ROOMS_LIST', JSON.stringify(result)), 500);
      })
    });

    // USERS LIST
    socket.on('RETRIEVE_USERS_LIST', () => {
      console.log('retrieving users list...');
      db.collection('users').find({}, {password: 0}).toArray((err, result) => {
        setTimeout(() => socket.emit('RECEIVE_USERS_LIST', JSON.stringify(result)), 500);
      })
    });

    // CREATE ROOM
    socket.on('CREATE_ROOM', (room) => {
      // TESTS ROOM VALIDITY ////TODOOOOO
      
      // insert into db
      db.collection('rooms').insertOne(JSON.parse(room), (err, response) => {
        
        // Send new rooms list to all
        db.collection('rooms').find({}).toArray((err, result) => {
          setTimeout(() => io.emit('RECEIVE_ROOMS_LIST', JSON.stringify(result)), 500);
        })
      });
    })
  });

  http.listen(8080);
});