var express = require('express');
var app = express();
var fs = require('fs');
var logger = require('morgan');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

var path = require('path');

app.locals.pretty=true;
app.set('veiws', '/views');
app.set('view engine', 'jade');

// morgan module을 이용한 logger
app.use(logger('short'));

// 굳이 path.resolve 를 사용하여 경로를 지정하는 이유는, mac, window 등은 디렉토리 구분자가 서로 다르기 때문에, 
// path module을 사용하여 서로 다른 환경에서 코드가 돌아갈 때 발생할 수 있는 문제를 미연에 방지하고자 함이다.

var publicPath = path.resolve('./public');
app.use(express.static(publicPath));

app.get('/topic/new', function(req, res) {
  fs.readdir('data', function(err, files) {
    if (err) throw err;
    res.render('new', {topics: files});
  });
});

app.get(['/topic', '/topic/:id'], function(req, res) {
  fs.readdir('data', function(err, files) {
    if (err) throw err;

    var id = req.params.id;
    if (id) {
      fs.readFile('data/'+id, 'utf8', function(err, data) {
        if (err) throw err;
        res.render('list', {topics: files, title: id, description : data});
      });
    } else {
      res.render('list', {topics: files, title: 'Hi!', description : 'welcome~'});
    }
  });
});

app.post('/topic', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/' + title, description, function(err) {
     if (err) {
       res.status(500).send('Internal Server Error');
     }
     // if success,
    res.redirect('/topic/' + title);
   });
});

app.listen(4100, function() {
  console.log('4100 port connected');
});
