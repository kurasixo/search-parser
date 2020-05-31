const uuidv4 = require('uuid').v4;

const fs = require('fs');

const cherrio = require('cheerio');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');

const getQuoteParser = require('../common/quote-parser');
const { quotesYourdict } = require('./selectors');

const getQuotes = ($) => {
  const quotes = [];

  $(quotesYourdict.elementSelector).each((_, el) => {
    quotes.push(el.children[0].data.replace('\'', ''));
  });

  return quotes;
};


const quotesYourdictParser = getQuoteParser({ getElements: getQuotes });

module.exports = quotesYourdictParser;
