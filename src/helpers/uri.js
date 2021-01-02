/**
 * Helper to encode, decode, and break apart a URL 
 *
 * @example
 *   {{uri "encodeURI" "URL"}}   
 *   {{uri "decodeURIComponent" "URL"}} 
 *
 * @param {string} operator or method 
 * @param {string} string    
 * @returns {any}  result
 */

module.exports = function(operator, string) {
  const URL = (typeof string === 'string') ? string : string.toString();
  switch (operator) {
    case 'decodeURI':
      return decodeURI(URL);
    case 'decodeURIComponent':
      return decodeURIComponent(URL);
    case 'encodeURI':
      return encodeURI(URL);
    case 'encodeURIComponent':
      return encodeURIComponent(URL);
    case 'getProtocol':
      return URL.split(':',2)[0];
    case 'getQueryString':
      return URL.split('?',2)[1];
    case 'stripProtocol':
      return URL.split(':',2)[1];
    case 'stripQueryString':
      return URL.split('?',2)[0];
    default:
      return URL;
  }
}