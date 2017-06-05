var express = require('express');
var app = express();
var randomInt = require('./random-integer');

app.locals.pretty=true

app.set('views', './views')
app.set('view engine', 'jade')

console.log(randomInt());
console.log(randomInt());
console.log(randomInt());
console.log(randomInt());
console.log(randomInt());
console.log(randomInt());

app.get('/topic/new', function(req, res) {
  res.render('topic')
})

app.post('/topic', function(req, res) {
  res.send('result of post');
});

app.listen(4100, function() {
  console.log('connected to 4100 port')
});
