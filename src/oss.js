#!/usr/bin/env node
import getOptions from './prompt.js';
import OSSApi from './api.js';
import ora from 'ora';
import chalk from 'chalk';

const ossApi = new OSSApi();

/**
 * @type {Options}
 */
const options = getOptions();

/**
 * @param {Quote} quote
 */
function printQuote(quote) {
  console.log(chalk.bold.yellow(quote.sentence));
  console.log(chalk.italic.grey(quote.character.name));
  console.log('\n');
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
