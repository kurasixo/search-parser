const fs = require('fs');

const clear = require('./clear');
const utils = require('./utils');
const defaults = require('../defaults');

const googleParser = require('../pic-parsers/google');
const duckduckParser = require('../pic-parsers/duckduck');


const main = async () => {
  const { folderName, url } = utils.getArgs(process.argv);

  const isGoogle = url.includes('google');
  const dirName = folderName;

  utils.initFolders(dirName);

  if (!folderName || !url) {
    return 0;
  }

  if (isGoogle) {
    await googleParser(folderName, url);
    return folderName;
  }

  await duckduckParser(folderName, url);
  return folderName;
};

main()
  .then((folderName) => {
    const output = `./${defaults.artifactsDirectory}/${folderName}`;

    utils.zipDirectory(folderName, output);
  });
