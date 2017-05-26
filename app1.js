var express = require('express');
var app = express();

// ÇÑ±ÛÅ×½ºÆ®
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

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

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
