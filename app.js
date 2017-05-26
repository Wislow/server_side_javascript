var express = require('express');
var app = express();

// 정적파일은 public아래 자원으로 서비스함.
app.use(express.static('public'));

// 라우터. 루트 디렉토리로 들어온 요청에 대해 처리.
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// 동적으로 html 코드를 생성하여 서비스.
app.get('/dynamic', function (req, res) {
var time = Date();
  var list = '';
  for (var i=0 ; i<10 ; i++) {
    list += '<li>'+i+'. Line</li>';
  }

  var output = `
  <!DOCTYPE html>
  <html>
  <head>hi welcome</head>
  <body>
  Hello guys!! It's ${time} right now...
  <ul>${list}</ul>
  </body>
  </html>`;

  res.send(output);
});

// 포트설정 
app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
