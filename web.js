var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);

app.locals.pretty=true;
app.set('veiws', '/views');
app.set('view engine', 'jade');

app.get('/topic/new', function(req, res) {
  res.render('new');
});

app.get('/topic', function(req, res) {
  fs.readdir('data', function(err, files) {
    if (err) throw err;
    res.render('list', {topics: files});
  });
});

app.get('/topic/:id', function(req, res) {
  var id = req.params.id;

  fs.readdir('data', function(err, files) {
    if (err) throw err;
    fs.readFile('data/'+id, 'utf8', function(err, data) {
      if (err) throw err;
      res.render('list', {topics: files, title: id, description : data});
    });
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
    res.send(title + ' file is saved.');
   });
});

app.listen(4100, function() {
  console.log('4100 port connected');
});
