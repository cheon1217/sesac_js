var readline = require('linebyline'), rl = readline('./example.txt');
rl.on('line', function(line, lineCount, byteCount) {
// do something with the line of text
console.log(line, lineCount, byteCount);
})
.on('error', function(e) {
// something went wrong
console.log("어.. 뭔가 오류 발생..", e.message);
});