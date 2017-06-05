var MAX = 100;

function randomInteger() {
  return Math.floor(Math.random() * MAX);
}

// 외부에 모듈을 노출한다. 
module.exports = randomInteger;
