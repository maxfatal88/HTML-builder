const fs = require('fs');
const path = require('path');
const objTags = [];
let index;

// создание папки project-dist
async function createFolder() {
  fs.promises
    .mkdir(path.join(__dirname, 'project-dist'), {
      recursive: true,
      force: true,
    })
    .then(() => {
      console.log('create folder project-dist');
    })
    .catch(() => {
      console.log('Failed to create directory');
    });
}

// заполнение обьекта информациеей из файлов
async function fillObject() {
  fs.promises
    .readdir(path.join(__dirname, 'components'))
    .then((filenames) => {
      for (let filename of filenames) {
        let name = filename.split('.')[0];
        let readableStream = fs.createReadStream(
          path.join(__dirname, 'components', filename),
          'utf8'
        );
        readableStream.on('data', function (chunk) {
          objTags[name] = chunk;
        });
      }
      console.log('fill object');
    })
    .catch((err) => {
      console.log(err);
    });
}

// создание index.html и заполнение его коректной информацией
async function createHtml() {
  fs.promises
    .readFile(path.join(__dirname, 'template.html'))
    .then(function (result) {
      index = result.toString().trim();
      for (let tag in objTags) {
        index = index.replace(`{{${tag}}}`, objTags[tag]);
      }
      (async function makeIndex() {
        try {
          await fs.promises.writeFile(
            path.join(__dirname, 'project-dist', 'index.html'),
            index
          );
          console.log('create html');
        } catch (err) {
          console.error(err);
        }
      })();
    })
    .catch(function (error) {
      console.log(error);
    });
}

//создание файла css
async function createCss() {
  fs.promises
    .readdir(path.join(__dirname, 'styles'))
    .then((filenames) => {
      for (let filename of filenames) {
        fs.promises
          .readFile(path.join(__dirname, 'styles', filename))
          .then(function (result) {
            let text = result.toString().trim();
            fs.appendFile(
              path.join(__dirname, 'project-dist', 'style.css'),
              text,
              (err) => {
                if (err) throw err;
              }
            );
            console.log('Append CSS');
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//удаление папки assets
async function removeAssets() {
  await fs.promises.rm(path.join(__dirname, 'project-dist', 'assets'), {
    recursive: true,
    force: true,
  });
  console.log('Reset assets');
}

// создание папки assets
async function folderPreparation() {
  await fs.promises
    .mkdir(path.join(__dirname, 'project-dist', 'assets'), {
      recursive: true,
      force: true,
    })
    .then(() => {
      console.log('Create folder assets');
    })
    .catch(() => {
      console.log('Failed to create directory');
    });
}

// функция копирования файлов
async function copyAssets(dirIn, dirOut) {
  let files = await fs.promises.readdir(dirIn, { withFileTypes: true });
  for (let file of files) {
    if (file.isDirectory()) {
      fs.promises.mkdir(path.join(dirOut, file.name));
      copyAssets(dirIn + '/' + file.name, dirOut + '/' + file.name);
    } else
      fs.copyFile(dirIn + '/' + file.name, dirOut + '/' + file.name, (err) => {
        if (err) throw err;
        console.log('File copied successfully');
      });
  }
}

async function main() {
  await removeAssets();
  await createFolder();
  await folderPreparation();
  await fillObject();
  await createHtml();
  await createCss();
  await copyAssets(
    path.join(__dirname, 'assets'),
    path.join(__dirname, 'project-dist', 'assets')
  );
}

main();

