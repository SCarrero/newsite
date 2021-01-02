/**
 * Helper to do math on 1-2 values
 *
 * @example
 *      {{#ifCond item1 '===' item2}}  {{/ifCond}}
 *      {{#ifCond var1 '!=' var2}}  {{/ifCond}}
 *
 * @param {string} operator  The math operator    
 * @param {any} v1    First value.
 * @param {any} v2    Second value (optional).
 * @returns {any}  result
 */

module.exports = function(operator, v1, value2) {
  if (arguments.length < 2) {
    throw new Error("Handlerbars Helper 'math' needs 2 parameters");
  }
  const v2 = value2 ? value2 : 0;
  switch (operator) {
    case 'add':
      return Number(v1) + Number(v2);
    case 'subtract':
      return Number(v1) - Number(v2);
    case 'multiply':
      return Number(v1) * Number(v2);
    case 'divide':
      return Number(v1) / Number(v2);
    case 'remainder':
      return Number(v1) % Number(v2);
    case 'exponent':
      return Number(v1) ** Number(v2);
    case 'fixed':
      
      return Number(v1).toFixed(Number(v2)); 
    case 'round':
      return Math.round(Number(v1));
    case 'ceiling':
      return Math.ceil(Number(v1)); 
    case 'floor':
      return Math.floor(Number(v1)); 
    case 'abs':
      return Math.abs(Number(v1));
    case 'random':
      const min = (typeof v1 === "number") ? Math.abs(v1) : 0;
      const max = (typeof v2 === "number") ? Math.abs(v2) : 100;
      if(max > min){
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      else {
        return "Max must be higher than min";
      }
    default:
      return Number(v1);
  }
}
