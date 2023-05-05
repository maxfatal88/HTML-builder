const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
  
fsPromises.mkdir(path.join(__dirname, 'file-copy'),{
  recursive: true,
  force: true,
}).then(()=> {
  console.log('Directory created successfully');
}).catch(()=> {
  console.log('Failed to create directory');
});

fs.readdir(path.join(__dirname, 'file-copy'), 
  (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file)=>{
        fs.unlink(path.join(__dirname, 'file-copy',  file), err => {
          if(err) throw err; 
          console.log('File deleted successfully');
        });
      });
    }
  }
);

fs.readdir(path.join(__dirname, 'files'), 
  (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file)=>{
        fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'file-copy',  file), err => {
          if(err) throw err; 
          console.log('File copied successfully');
        });
      });
    }
  }
);




