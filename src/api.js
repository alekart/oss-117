const path = require('path');

/**
 * @typedef {Object} Options
 * @property {string} [character]
 * @property {number} [number]
 * @property {string} [keyword]
 */
/**
 * @typedef {Object} Character
 * @property {string} name
 * @property {string} slug
 */

/**
 * @typedef {Object} CharacterQuotes
 * @property {string} name
 * @property {string} slug
 * @property {string[]} quotes
 */
/**
 * @typedef {Object} Quote
 * @property {string} sentence
 * @property {Character} character
 */

class OSSApi {
  static url = 'https://api.oss117quotes.xyz/v1/';
  static endpoints = {
    random: `random/{number}`,
    author: `author/{character}/{number}`,
    character: `character/{character}`,
    all: 'characters',
  };

  /**
   * Get OSS 117 quotes from the API based on the provided options.
   * @param {Options} options
   * @returns {Promise<Quote[]>}
   */
  getQuotes(options) {
    if (options?.keyword) {
      return this.getKeywordQuote(options);
    }
    let url;
    if (options?.character) {
      url = this.makeUrl('author', options);
    } else {
      url = this.makeUrl('random', options);
    }
    return this.request(url).then((data) => !Array.isArray(data) ? [data] : data);
  }

  /**
   * @returns {Promise<CharacterQuotes[]>}
   */
  getAllQuotes() {
    const url = this.makeUrl('all');
    return this.request(url);
  }

  /**
   * @param {string} character
   * @returns {Promise<CharacterQuotes | undefined>}
   * @private
   */
  getAllCharacterQuotes(character) {
    const url = this.makeUrl('character', {character});
    return this.request(url).then((data) => data[0]);
  }

  /**
   * @param {Options} options
   * @returns {Promise<Quote[]>}
   */
  getKeywordQuote(options) {
    const errorMsg = 'No quotes found for the provided keyword.';
    if (options.character) {
      let character;
      return this.getAllCharacterQuotes(options.character)
        .then((characterQuotes) => {
          if (!characterQuotes) {
            console.log('Wrong character name. Please check the character list.');
            return [];
          }
          return this.findKeywordSentences(characterQuotes, options.keyword);
        });
    }

    return this.getAllQuotes().then(
      (characters) => {
        const quotes = characters.map((character) => this.findKeywordSentences(character, options.keyword));
        return quotes.flat().slice(0, options.number || 1);
      }
    )
  }

  /**
   * Search provided keyword in provided the character quotes.
   *
   * @param {CharacterQuotes} characterQuotes
   * @param {string} keyword
   * @returns {Quote[]}
   * @private
   */
  findKeywordSentences(characterQuotes, keyword) {
    const found = characterQuotes.quotes.filter((quote) => {
      return quote.includes(keyword);
    });
    return found.map((quote) => ({
      sentence: quote,
      character: {
        name: characterQuotes.name,
        slug: characterQuotes.slug,
      },
    }));
  }

  /**
   * @param link
   * @param method
   * @returns {Promise<any>|*}
   */
  request(link, method = 'GET') {
    return fetch(link, {method})
      .then((response) => response.json())
      .then((data) => data);
  }

  /**
   * @param {string} endpoint
   * @param {Options} [options]
   * @returns {string}
   * @private
   */
  makeUrl(endpoint, options) {
    const point = OSSApi.endpoints[endpoint]
      .replace('{character}', options?.character || '')
      .replace('{number}', options?.number || '')
      .replace('//', '/')
      .replace(/\/$/, '');
    return path.join(OSSApi.url, point);
  };
}

module.exports = OSSApi;
