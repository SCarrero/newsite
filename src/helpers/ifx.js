
/**
 * Helper to imitate the ternary '?:' conditional operator.
 *
 * @example
 *      {{ifx true 'Foo' 'Bar'}}    => Foo
 *      {{ifx false 'Foo' 'Bar'}}   => Foo
 *
 * @param {boolean} condition
 * @param {any} value1    Value to return when the condition holds true.
 * @param {any} value2    Value to return when the condition is false (Optional).
 * @returns {any}
 */

module.exports = function ifx(condition, value1, value2) {
  // Check if user has omitted the last parameter
  // if that's the case, it would be the Handlebars options object
  // which it sends always as the last parameter.
  if (isObject(value2) && value2.name === 'ifx' && value2.hasOwnProperty('hash')) {
    // This means the user has skipped the last parameter,
    // so we should return an empty string ('') in the else case instead.
    value2 = '';
  }
  return condition ? value1 : value2;
}
