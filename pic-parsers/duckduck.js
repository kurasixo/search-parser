const uuidv4 = require('uuid').v4;

const fs = require('fs');

const cherrio = require('cheerio');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');

const getParser = require('../common/parser');
const { duckduckgo } = require('./selectors');

const getImages = ($) => {
  const imageSrcs = [];

  $(duckduckgo.elementSelector).each((_, el) => {
    const [_1, imageSrc] = el.attribs.src.split('//');
    imageSrcs.push(`https://${imageSrc}`);
  });

  return imageSrcs;
};

const getForEachElement = (folderName) => {
  const forEachFunc = async (element) => {
    if (!element) {
      return;
    }

    fetch(element)
      .then(x => x.arrayBuffer())
      .then(x => {
        fs.appendFile(`./${folderName}/${uuidv4()}.jpg`, Buffer.from(x), { flag: 'wx' }, () => {});
      })
      .catch(e => {});
  };

  return forEachFunc;
};

const duckduckgoParser = getParser({
  getForEachElement,
  getElements: getImages,
  selectorGroup: duckduckgo,
});

module.exports = duckduckgoParser;
