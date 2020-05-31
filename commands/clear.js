const rimraf = require('rimraf');
const defaults = require('../defaults');

const clear = (folderName) => {
  rimraf.sync(folderName);
}

module.exports = clear;
