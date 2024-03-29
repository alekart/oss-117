#!/usr/bin/env node
import getOptions from './prompt.js';
import OSSApi from './api.js';
import ora from 'ora';
import chalk from 'chalk';
import displayCharactersList from './display-characters-list.js';

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

if (options.list) {
  displayCharactersList();
}

const spinner = ora('Watching the movie, hold on...').start();
ossApi.getQuotes(options).then((quotes) => {
  spinner.stop();
  if (quotes.length && options.number && quotes.length < options.number) {
    console.log(chalk.bgYellow(`I've only found ${quotes.length} quote(s) with provided options:\n`));
  }
  quotes.forEach((quote) => {
    printQuote(quote);
  });
}).catch((error) => {
  spinner.stop();
  console.log(chalk.red(error));
});
