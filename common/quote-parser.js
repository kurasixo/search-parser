const uuidv4 = require('uuid').v4;

const fs = require('fs');
const path = require('path');

const cherrio = require('cheerio');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');

const { navigate: navigateDefault, initBrowser } = require('./utils');
const { themes } = require('./consts');
const { artifactsDirectory } = require('../defaults');

const getQuoteParser = ({ getElements }) => {
  const quoteParser = async () => {
    const res = {};

    const promiseMap = Object
      .keys(themes)
      .map(async (key) => {
        const response = await fetch(themes[key]);
        const html = await response.text();

        const $ = cherrio.load(html);
        const elements = getElements($);
        res[key] = elements;
      });

    Promise
      .all(promiseMap)
      .then(() => {
        fs.writeFile(`./${artifactsDirectory}/${uuidv4()}.json`, JSON.stringify(res), console.log);
      });
  };

  return quoteParser;
}

module.exports = getQuoteParser;
