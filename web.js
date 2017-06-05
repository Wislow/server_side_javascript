var express = require('express');
var app = express();
var fs = require('fs');
var logger = require('morgan');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);

app.locals.pretty=true;
app.set('veiws', '/views');
app.set('view engine', 'jade');

// morgan module을 이용한 logger
app.use(logger('short'));

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
