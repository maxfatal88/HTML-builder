const fs = require('fs');
const path = require('path');

let readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');
readableStream.on('data', function(chunk){ 
  console.log(chunk);
});