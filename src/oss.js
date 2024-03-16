import getOptions from './prompt.js';
import OSSApi from './api.js';
import ora from 'ora';

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

const spinner = ora('Watching the movie, hold on...').start();
ossApi.getQuotes(options).then((quotes) => {
  spinner.stop();
  quotes.forEach((quote) => {
    printQuote(quote);
  });
}).catch((error) => {
  spinner.stop();
  console.error(error);
});
