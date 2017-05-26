var express = require('express');
var app = express();

// 정적파일은 public 디렉터리 아래 자원들로 서비스한다. 
app.use(express.static('public'));

// 라우팅. / 루트 디렉터리로 들어온 요청을 처리. 
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// 포트지정
app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
