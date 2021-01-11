/**
 * Helper to name & store a variable
 *
 * @example
 *   {{setVar "hero" image }} 
 *   can be accessed as {{@root.hero}}
 *   {{setVar "background" ../bgimage }} 
 *   can be accessed as {{@root.background}}
 *
 * @param {string} varName    name of variable to create
 * @param {any} varValue  the value to assign to the variable   
 * @param {any} options   
 */

module.exports = function(varName, varValue, options) {
  options.data.root[varName] = varValue;
}