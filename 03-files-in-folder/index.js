// const fs = require('fs');
const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), 
  (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file)=>{
        fs.stat(path.resolve(__dirname, 'secret-folder', file), (err, stat) => {
          if (err) 
            throw err;
          if (stat.isFile){
            let fileName = file.split('.')[0];
            let fileExtension = path.extname(file).split('.')[1];
            let fileSize = (stat.size/1024).toFixed(1) + 'kb';
            console.log(`${fileName}-${fileExtension}-${fileSize}`);
          }
        });
      });
    }
  }
);


