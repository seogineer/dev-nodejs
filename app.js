const express = require('express');
const app = express();
const port = 3000;

//POST 방식으로 전송한 데이터 사용
app.use(express.urlencoded({ extended: true }));

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('public'));

//form
app.get('/form', function(req, res){
  res.render('form');
});

//form_receiver GET
app.get('/form_receiver', (req, res) => {
  var title = req.query.title;
  var description = req.query.description;
  res.send(title + ',' + description);
});

//form_receiver POST
app.post('/form_receiver', (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  res.send(title + ',' + description);
});

//쿼리스트링
app.get('/topic', (req, res) => {
  var topics = [
    'Javascript is ...',
    'Nodejs is ...',
    'Express is ...'
  ];

  var output = `
    <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">Nodejs</a><br>
    <a href="/topic?id=2">Express</a><br><br>
    ${topics[req.query.id]}
  `
  res.send(output);
});

//시멘틱 URL
app.get('/topic/:id', (req, res) => {
  var topics = [
    'Javascript is ...',
    'Nodejs is ...',
    'Express is ...'
  ];

  var output = `
    <a href="/topic/0">JavaScript</a><br>
    <a href="/topic/1">Nodejs</a><br>
    <a href="/topic/2">Express</a><br><br>
    ${topics[req.params.id]}
  `
  res.send(output);
});

//시멘틱 URL 2
app.get('/topic/:id/:mode', (req, res) => {
  res.send(req.params.id + ',' + req.params.mode);
});

//Jade Template
app.get('/template', (req, res) => {
  res.render('temp', {time:Date(), _title:'Jade'});
});

app.get('/', (req, res) => {
  res.send('Hello home page');
});

//동적웹페이지
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

//라우터
app.get('/route', (req, res) => {
  res.send('Hello Router, <img src="/example.jpg">');
});

app.get('/login', (req, res) => {
  res.send('<h1>Login please</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});