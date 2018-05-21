import express from 'express';

const app = express();

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

app.listen(8080);