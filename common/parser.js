const uuidv4 = require('uuid').v4;

const fs = require('fs');
const path = require('path');

const cherrio = require('cheerio');
const puppeteer = require('puppeteer');
const archiver = require('archiver');

const { navigate: navigateDefault, initBrowser } = require('./utils');
const { elementsCount: elementsCountDefault } = require('../defaults');

const getParser = ({
  getElements,
  selectorGroup,
  getForEachElement,
  getMapFunc,

  navigate = navigateDefault,
  elementsCount = elementsCountDefault,
}) => {
  let innerMapFunc = getMapFunc;
  if (!getMapFunc) {
    innerMapFunc = (el) => el;
  }

  const parser = async (folderName, url) => {
    const { browser, page } = await initBrowser(url);

    await navigate(page, selectorGroup, elementsCount);

    const pageContent = await page.content();
    await browser.close();

    const $ = cherrio.load(pageContent);
    const elementsSrcs = getElements($);

    console.log(elementsSrcs.length);

    const forEachElementFunc = getForEachElement(folderName);
    elementsSrcs.forEach(forEachElementFunc);
  };

  return parser;
}

module.exports = getParser;
