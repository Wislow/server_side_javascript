var express = require('express');
var app = express();
app.locals.pretty=true

app.set('views', './views')
app.set('view engine', 'jade')

app.get('/topic/new', function(req, res) {
  res.render('topic')
})

app.post('/topic', function(req, res) {
  res.send('result of post');
});

app.listen(4100, function() {
  console.log('connected to 4100 port')
});
