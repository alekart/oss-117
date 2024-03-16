const path = require('path');

/**
 * @typedef {Object} Options
 * @property {string} [character]
 * @property {number} [number]
 * @property {string} [keyword]
 */

class OSSApi {
  static url = 'https://api.oss117quotes.xyz/v1/';
  static endpoints = {
    random: `random/{number}`,
    character: `author/{character}/{number}`,
    all: 'characters',
  };

  /**
   * Get OSS 117 quotes from the API based on the provided options.
   * @param {Options} options
   * @returns {string}
   */
  getQuotes(options) {
    if (options?.keyword) {
      return this.getKeywordQuote(options);
    }
    if (options?.character) {
      return this.request(this.makeUrl('character', options));
    }
    return this.request(this.makeUrl('random', options));
  }

  /**
   * @param {Options} options
   * @returns {string}
   */
  getKeywordQuote(options) {
    const url = makeUrl('all');
    // TODO: fetch quotes from the API
    //  search in all quotes for the keyword
    //  return the quotes containing the keyword (number or less)
    //  return an error message if no quotes are found
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
