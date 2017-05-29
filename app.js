var express = require('express');
var app = express();

// jade 문법이 보기 힘드니까.. 이쁘게 만들어 줘보자. 아래 코드가 없으면 코드가 전부 inline으로 들어감.
app.locals.pretty = true;

// 템플릿 엔진을 셋팅.
app.set('view engine', 'jade');

// 템플릿 파일은 ./views 하위 디렉토리의 자원들로 서비스함.
app.set('views', './views');

// 파라미터에 따른 처리.
app.get('/topic', function(req, res) {
  var id = req.query.id;
  var qe1 = req.query.qe.a;
  var qe2 = req.query.qe.b;
  res.send('id : ' + id + '\nQe1 : ' + qe1 + ', Qe2: ' + qe2);
});

app.get('/param', function(req, res) {
  var array = ['안녕하세요.', '구름빵이 먹고싶네요.', '늦은밤에 스터디하니 씐이 나네요.'];
  var links = `
    <a href="/param?id=0"/>인사</a><br>
    <a href="/param?id=1"/>뭐가 먹고싶게?</a><br>
    <a href="/param?id=2"/>나의 기분은?</a><hr>
    ${array[req.query.id]}
  `

  res.send(links);
});

// parameter를 symentic url 형태로 보내서 받을 수 있지만, 정의한 위치에 파라미터가 전달되지 않으면 바로 에러.
app.get('/dynamicParams/:param/:id', function(req, res) {
  res.send(req.params.param + ", " + req.params.id);
});
// ============ 파라미터 테스트 끝

// 정적파일은 public아래 자원으로 서비스함.
app.use(express.static('public'));

// template engine을 활용한 서비스페이지 라우팅.
app.get('/template', function(req, res) {
  // template engine으로 사용되는 temp 파일에 time 이라는 인자를 전달할 수 있다.
  res.render('temp', {time: Date(), pageTitle: 'jade sample'});
});

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
