var express = require('express')
var app = express()

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

// myLogger 의 next 함수로 아래와 같이 넘기면, next()가 실행되고 끝나질 않아서 루트나 one과 같은 요청에대한 라우터 핸들러가 이벤트를 받지 못한다.
// 따라서 미들웨어의 선언 위치가 중요하다.
/*
app.use(myLogger, function() {
  console.log('next middleware')
})
*/

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', function (req, res) {
  console.log(33)
  res.send('Hello World!')
})

app.get('/one', function (req, res) {
  console.log(11)
  res.send('one')
})

app.get('/time', function (req, res) {
  var responseText = 'Hello World!';
  responseText += 'Requested at: ' + req.requestTime + '';
  res.send(responseText);
});


app.listen(4100)
