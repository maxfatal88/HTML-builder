const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const textFile = path.join(__dirname, 'text.txt');

fs.writeFile(
  path.join(__dirname, 'text.txt'),
  '',
  (err) => {
    if (err) throw err;
  }
); 
stdout.write('введите текст\n');
let text = '';
stdin.on('data', data => {
  text = data.toString().trim();
  if(text === 'exit') {
    stdout.write('Goodbuy\n');
    process.exit();
  }
  fs.appendFile(
    textFile,
    text,
    err => {
      if (err) throw err;
    }
  );});
process.on('SIGINT', () => {
  stdout.write('Goodbuy\n');
  process.exit();
});