import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function displayCharactersList() {
  const charFilePath = join(__dirname, 'characters.json');
  try {
    const file = readFileSync(charFilePath, {encoding: 'utf-8'});
    const chars = JSON.parse(file);
    console.log(chalk.bgYellow('Available characters:'));
    console.log('Use the short alias in command.');
    console.log(chalk.grey('The list might be outdated, check out the API documentation https://github.com/shevabam/oss-117-quotes-api\n'));
    Object.keys(chars).forEach((character) => {
      console.log(`${chalk.bold.yellow(character)}: ${chars[character].name}`);
    });
    process.exit(0);
  } catch (error) {
    console.log(chalk.red('Characters list is not found or corrupted.'));
    process.exit(1);
  }
}
