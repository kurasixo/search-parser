const fs = require('fs');

const clear = require('./clear');
const utils = require('./utils');
const defaults = require('../defaults');

const quotesYourdictParser = require('../quotes-parser/quotes-yourdict');


const main = async () => {
  await quotesYourdictParser();
};

main()
