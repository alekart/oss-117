import getOptions from './prompt.js';
import OSSApi from './api.js';

const ossApi = new OSSApi();

/**
 * @type {Options}
 */
const options = getOptions();

/**
 * @param {Quote} quote
 */
function printQuote(quote) {
  console.log(`${quote.character.name}\n\t«${quote.sentence}»`);
}

ossApi.getQuotes(options).then((quotes) => {
  quotes.forEach((quote) => {
    printQuote(quote);
  });
}).catch((error) => {
  console.error(error);
});
