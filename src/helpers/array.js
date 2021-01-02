/**
 * Helper to create array and do array type functions
 *
 * @example
 *   {{array "" items}}   
 *   {{array "shift" items}}  
 *   {{array "push" items "FooBar"}} 
 *
 * @param {string} operator or method 
 * @param {array} array 
 * @param {any} v1    Second value (optional depending upon function).
 * @param {any} v2    Third value (optional depending upon function).
 * @returns {any}  result
 */

module.exports = function(operator, array, v1, v2) {
  const arr = Array.isArray(array) ? array : [array];
  const arr2 = Array.isArray(v1) ? v1 : [];
  const divider = v1 ? v1 : ' ';
  const str1 = v1 ? v1 : '';
  switch (operator) {
    case 'concat':
      return arr.concat(arr2);
    case 'inArray':
      return arr.indexOf(v1) > -1 ? true : false;
    case 'join':
      return arr.join(divider);
    case 'length':
      return arr.length;
    case 'pop':
      return arr.pop();
    case 'push':
      arr.push(str1);
      return arr;
    case 'randomize':
      var newArr = arr.slice(), m = newArr.length, t, i;
      while (m) {    
        i = Math.floor(Math.random() * m--);
        t = newArr[m];
        newArr[m] = newArr[i];
        newArr[i] = t;
      }
      return newArr;
    case 'reverse':
      var z = arr.slice();
      z.reverse();
      return z;
    case 'shift':
      return arr.shift();
    case 'slice':
      const start = Number.isInteger(v1) ? v1 : 0;
      const end = Number.isInteger(v2) ? v2 : arr.length;
      if(end > 0) {
        return arr.slice(start, end);
      } else {
        return arr.slice(start);
      };
    case 'sort':
      return arr.sort();
    case 'unshift':
      arr.unshift(str1);
      return arr;
    default:
      return arr;
  }
}
  