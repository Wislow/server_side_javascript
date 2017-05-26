var express = require('express');
var app = express();

// ���������� public ���͸� �Ʒ� �ڿ���� �����Ѵ�. 
app.use(express.static('public'));

// �����. / ��Ʈ ���͸��� ���� ��û�� ó��. 
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// ��Ʈ����
app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
