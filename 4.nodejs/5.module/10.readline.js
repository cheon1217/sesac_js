var readline = require('linebyline'),
rl = readline('./somefile.txt');
rl.on('line', function(line, lineCount, byteCount) {
// do something with the line of text
})
.on('error', function(e) {
// something went wrong
});