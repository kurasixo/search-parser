const fs = require('fs');

const archiver = require('archiver');

const defaults = require('../defaults');


const zipDirectory = async (source, out) => {
  const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream(`${out}.zip`);

  archive
    .directory(source, false)
    .on('error', err => reject(err))
    .pipe(stream);

  return archive.finalize();
}


const getArgs = (args) => {
  return args
    .slice(2)
    .reduce((acc, it, index) => {
      const [key, ...values] = it.split('=');
      acc[key] = values.join('=').replace('\\', '');
      return acc;
    }, {});
}


const initFolders = (subImageFolderName) => {
  const folders = [defaults.artifactsDirectory, subImageFolderName];

  folders.forEach((folderDirName) => {
    if (!fs.existsSync(folderDirName)) {
      fs.mkdirSync(folderDirName);
    }
  });
};

module.exports = { initFolders, getArgs, zipDirectory };
