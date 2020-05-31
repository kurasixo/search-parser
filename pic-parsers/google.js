const uuidv4 = require('uuid').v4;

const fs = require('fs');

const cherrio = require('cheerio');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');

const getParser = require('../common/parser');
const { google } = require('./selectors');

const getImages = ($) => {
  const imageSrcs = [];

  $(google.elementSelector).each((_, el) => {
    imageSrcs.push(el.attribs.src);
  });

  return imageSrcs;
};

const getForEachElement = (folderName) => {
  const forEachFunc = async (element) => {
    if (!element) {
      return;
    }

    if (element.includes('http')) {
      return fetch(element)
        .then(x => x.arrayBuffer())
        .then(x => {
          fs.appendFile(`./${folderName}/${uuidv4()}.jpeg`, Buffer.from(x), { flag: 'wx' }, () => {});
        })
        .catch(e => {});
    }

    const base64Data = element.replace('data:image/jpeg;base64,', '');
    fs.writeFile(`./${folderName}/${uuidv4()}.jpeg`, base64Data, 'base64', () => {});
  };

  return forEachFunc;
};

const googleParser = getParser({
  getForEachElement,
  getElements: getImages,
  selectorGroup: google,
});

module.exports = googleParser;
