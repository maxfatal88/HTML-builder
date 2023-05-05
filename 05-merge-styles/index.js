const fs = require('fs');
const path = require('path');

fs.writeFile(
  path.join(__dirname, 'project-dist', 'bundle.css'),
  '',
  (err) => {
    if (err) throw err;
    
  }
);

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      let fileExtension = path.extname(file).split('.')[1];
      if (fileExtension === 'css') {
        fs.readFile(
          path.join(__dirname, 'styles', file),
          'utf-8',
          (err, data) => {
            if (err) throw err;
            fs.appendFile(
              path.join(__dirname, 'project-dist', 'bundle.css'),
              data,
              err => {
                if (err) throw err;
              }
            );
          }
        );
      }
    });
  }
});




