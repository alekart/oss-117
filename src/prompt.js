/**
 * Demand the user to provide a number of quotes to display, a character name or a keyword.
 */
const argv = require('yargs/yargs')(process.argv.slice(2))
  .options({
    number: {
      alias: 'n',
      describe: 'Number of random quotes to display',
    },
    character: {
      alias: 'c',
      describe: 'Display quotes for specified character name (slug)',
    },
    keyword: {
      alias: 'k',
      describe: 'Display quotes including provided keyword',
    },
  })
  .usage(`Usage: $0 [options]
  Options can be combined to get more specific quotes.`)
  .example('oss', 'Ça suffit Loktar, tu te tais ou je te tais !')
  .example('oss --number 2', 'You stupid son of a b**ch\nComment est votre blanquette ?')
  .example('oss --character hubert', 'One random OSS 117 quote for Hubert')
  .example('oss --keyword=blanquette', 'Comment est votre blanquette ?')
  .example('oss --character hubert -n 2', 'Comment est votre blanquette ?\nAh oui c\'est... c\'est cocasse.')
  .help()
  .argv;

module.exports.arguments = argv;
