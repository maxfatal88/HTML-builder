const fs = require('fs');
const path = require('path');

async function readInfo() {
  let files = await fs.promises.readdir(path.join(__dirname, 'secret-folder'), {
    withFileTypes: true,
  });
  files.forEach((file) => {
    if (file.isFile()) {
      (async () => {
        const stats = await fs.promises.stat(
          path.join(__dirname, 'secret-folder', file.name)
        );
        const fileName = file.name.split('.')[0];
        const fileExtension = path.extname(file.name).split('.')[1];
        const fileSize = (stats.size / 1024).toFixed(3) + 'kb';
        console.log(`${fileName}-${fileExtension}-${fileSize}`);
      })();
    }
  });
}

readInfo();
