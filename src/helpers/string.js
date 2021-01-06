/**
 * Helper to create string and do string type functions
 *
 * @example
 *   {{string "lowercase" "FooBar"}}  
 *   {{string "trim" sloppyValue}}   
 *   {{string "replace" "-" "/"}}   
 *
 * @param {string} operator  action to take on v1
 * @param {string} v1  The string to be modified
 * @param {any} v2    Second value (optional depending upon function).
 * @param {any} v3    Third value (optional depending upon function).
 * @param {any} v4    Fourth value (optional depending upon function).
 * @returns {any}  result
 */

module.exports = function(operator, v1, v2, v3, v4) {
  if (!v1) {
    return null;
  }
  const str1 = (typeof v1 === 'string') ? v1 : v1.toString();  
  switch (operator) {
    case 'capitalize':
      return str1.charAt(0).toUpperCase() + str1.slice(1);
    case 'charAt':
      return str1.charAt(parseInt(v2));
    case 'chop':
      /* Remove leading and trailing whitespace/non-word characters */
      const reg = /^[-_.\W\s]+|[-_.\W\s]+$/g;
      return str1.trim().replace(reg, '');
    case 'ellipsify':
      const maxLength = Number.isInteger(v2) ? v2 : str1.length;
      if(maxLength < str1.length) {
        return str1.slice(0, maxLength).trim() + "&hellip;";
      } else {
        return str1;
      }
    case 'ellipsifyWords':
      const words = str1.split(/[ \t]/);
      const maxWords = Number.isInteger(v2) ? v2 : words.length;
      if(maxWords < words.length) {
        return words.slice(0, maxWords).join(' ').trim() + "&hellip;";
      } else {
        return str1;
      }
    case 'indexOf':
      const start2 = Number.isInteger(v3) ? v3 : 0;
      return str1.indexOf(v2, start2);
    case 'lastIndexOf':
      const start3 = Number.isInteger(v3) ? v3 : str1.length;
      return str1.lastIndexOf(v2, start3);
    case 'length':
      return str1.length;
    case 'lowercase':
      return str1.toLowerCase();
    case 'padStart':
      return str1.padStart(parseInt(v2),v3);
    case 'replace':
      const options = (typeof v4 === 'string') ? v4 : 'g';
      const re = new RegExp(v2, options);
      return str1.replace(re, v3);
    case 'reverse':
      return str1.split('').reverse().join('');    
    case 'sanitize':
      return str1.replace(/<[^>]+>/g, '').replace(/\&[^;]{3,6};/g, '');
    case 'search':
      return str1.search(v2);
    case 'slice':
      const start = Number.isInteger(v2) ? v2 : 0;
      const end = Number.isInteger(v3) ? v3 : 0;
      if(end > 0) {
        return str1.slice(start, end);
      } else {
        return str1.slice(start);
      };
    case 'split':
      const divider = (typeof v2 === 'string') ? v2 : " ";
      const limit = parseInt(v3) || 0;
      if(limit > 0){
        return str1.split(divider, limit);
      }
      else {
        return str1.split(divider);
      };
    case 'test':
      const options2 = (typeof v3 === 'string') ? v3 : 'g';
      const teststr = (typeof v2 === 'string') ? v2 : " ";
      const re2 = new RegExp(teststr, options2);
      return re2.test(str1);      
    case 'titlecase':
      return str1.replace(/\w\S*/g, function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
    case 'trim':
      return str1.trim();
    case 'unquote':
      return str1.split('"').join('&quot;');
    case 'uppercase':
      return str1.toUpperCase();
    default:
      return str1;
  }
}
