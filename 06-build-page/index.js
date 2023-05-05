const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

fsPromises.mkdir(path.join(__dirname, 'project-dist'),{
  recursive: true,
  force: true,
}).then(()=> {
  console.log('Directory created successfully');
}).catch(()=> {
  console.log('Failed to create directory');
});

