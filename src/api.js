import path from 'path';

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

export default class OSSApi {
  static url = 'https://api.oss117quotes.xyz/v1/';
  static endpoints = {
    random: `random/{number}`,
    author: `author/{character}/{number}`,
    character: `character/{character}`,
    all: 'characters',
  };
  static errors = {
    wrongCharacter: 'Wrong character name. Please check the character list.',
    noQuotes: 'No quotes found for the provided character.',
    noKeyword: 'No quotes found for the provided keyword.',
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
    let req;
    if (options?.character) {
      req = this.request(this.makeUrl('author', options))
        .then((data) => {
          data = !Array.isArray(data) ? [data] : data;
          if (!data.length) {
            return Promise.reject(OSSApi.errors.noQuotes);
          }
          return data;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    } else {
      req = this.request(this.makeUrl('random', options));
    }
    return req.then((data) => !Array.isArray(data) ? [data] : data);
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
    return this.request(url).then((data) => {
      if(data[0]) {
        return data[0];
      }
      return undefined;
    }).catch(() => undefined);
  }

  /**
   * @param {Options} options
   * @returns {Promise<Quote[]>}
   */
  getKeywordQuote(options) {
    let req;
    if (options.character) {
      req = this.getAllCharacterQuotes(options.character)
        .then((characterQuotes) => {
          if (!characterQuotes) {
            return Promise.reject(OSSApi.errors.wrongCharacter);
          }
          return this.findKeywordSentences(characterQuotes, options.keyword);
        });
    } else {
      req = this.getAllQuotes()
        .then(
        (characters) => {
          return characters
            .map((character) => this.findKeywordSentences(character, options.keyword))
            .flat();
        },
      );
    }

    return req.then((data) => {
      if (!data.length) {
        return Promise.reject(OSSApi.errors.noKeyword);
      }
      if(options.number) {
        return data.slice(0, options.number);
      }
      return [data[Math.floor(Math.random() * data.length)]];
    });
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
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
    const found = characterQuotes.quotes.filter((quote) => {
      return regex.test(quote);
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
      .then((response) => {
        return response.json();
      })
      .then((data) => data)
      .catch(() => {
        return [];
      });
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
