const express = require('express');
const app = express();
const port = 3000;

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('public'));

app.get('/template', (req, res) => {
  res.render('temp', {time:Date(), _title:'Jade'});
});

app.get('/', (req, res) => {
  res.send('Hello home page');
});

app.get('/login', (req, res) => {
  res.send('<h1>Login please</h1>');
});

app.get('/dynamic', (req, res) => {
  let lis = '';
  
  for(let i = 0; i < 5; i++){
    lis += '<li>coding</li>';
  }
  let time = Date();
  let output = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Document</title>
  </head>
  <body>
      Hello, Dynamic!
      <ul>
        ${lis}
      </ul>
      ${time}
  </body>
  </html>`;
  res.send(output);
});

app.get('/route', (req, res) => {
  res.send('Hello Router, <img src="/example.jpg">');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});