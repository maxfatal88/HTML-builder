const fs = require('fs');
const path = require('path');

async function removeFiles() {
  await fs.promises.rm(path.join(__dirname, 'file-copy'), {
    recursive: true,
    force: true,
  });
  console.log('Remove folder');
}

async function folderPreparation() {
  await fs.promises
    .mkdir(path.join(__dirname, 'file-copy'), {
      recursive: true,
      force: true,
    })
    .then(() => {
      console.log('Create folder');
    })
    .catch(() => {
      console.log('Failed to create directory');
    });
}

async function copyFiles(dirIn, dirOut) {
  let files = await fs.promises.readdir(dirIn, { withFileTypes: true });
  for (let file of files) {
    if (file.isDirectory()) {
      fs.promises.mkdir(path.join(dirOut, file.name));
      copyFiles(dirIn + '/' + file.name, dirOut + '/' + file.name);
    } else
      fs.copyFile(dirIn + '/' + file.name, dirOut + '/' + file.name, (err) => {
        if (err) throw err;
        console.log('File copied successfully');
      });
  }
}

async function main() {
  await removeFiles();
  folderPreparation();
  copyFiles(path.join(__dirname, 'files'), path.join(__dirname, 'file-copy'));
}

main();
