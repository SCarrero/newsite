/**
 * Helper to test 2 values conditionally
 *
 * @example
 *      {{#ifCond "item1" '===' "item2"}}  {{/ifCond}}
 *      {{#ifCond var1 '!=' var2}}  {{/ifCond}}
 *
 * @param {any} v1    First value to compare.
 * @param {string} operator  The comparison operator    
 * @param {any} v2    Second value to compare.
 * @param {any} options    additional options (Optional).
 * @returns {boolean}  true/false
 */
module.exports = function(v1, operator, v2, options) {
  if (arguments.length < 3) {
    throw new Error("Handlerbars Helper 'ifCond' needs 3 parameters");
  }
  switch (operator) {
    case '==':
      return (v1 == v2);
    case '===':
      return (v1 === v2);
    case '!=':
      return (v1 != v2);
    case '!==':
      return (v1 !== v2);
    case '<':
      return (v1 < v2);
    case '<=':
      return (v1 <= v2);
    case '>':
      return (v1 > v2);
    case '>=':
      return (v1 >= v2);
    case '&&':
      return (v1 && v2);
    case '||':
      return (v1 || v2);
    default:
      return false;
  }
}