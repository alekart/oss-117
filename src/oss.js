const args = require('./prompt');
const OSSApi = require('./api');
const ossApi = new OSSApi();

/**
 * @type {Options}
 */
const options = {
  character: args.arguments.character,
  number: args.arguments.number,
  keyword: args.arguments.keyword,
};

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
