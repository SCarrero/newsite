/**
 * Helper to do simple date related functions
 *
 * @example
 * {{date 'USCalendar'}}
 * {{date 'month' dateVar}}
 *
 * @param {string} operator  action to take
 * @param {any} v1 
 * @param {date} v2    Second value (optional depending upon function).
 * @returns {any}  result
 */
module.exports = function(operator, newDt) { 
  const dt = (newDt && Date.parse(newDt)) ? new Date(newDt) : new Date();
  switch (operator) {
    case 'USCalendar':
      return new Intl.DateTimeFormat('en-US', {dateStyle: 'full'}).format(dt);
    case 'dateNum':
      return dt.getDate();
    case 'dateStr':
      return dt.getDate().toString().padStart(2, '0');
    case 'USDate':
      return new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric'}).format(dt);
    case 'USDateShort':
      return new Intl.DateTimeFormat('en-US', { month: 'numeric', day: 'numeric', year: '2-digit'}).format(dt);
    case 'weekdayNum':
      return dt.getDay() + 1;
    case 'weekdayStr':
      return new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(dt);
    case 'month':
      return new Intl.DateTimeFormat('en-US', { month: 'long'}).format(dt);
    case 'monthAbr':
      return new Intl.DateTimeFormat('en-US', { month: 'short'}).format(dt);
    case 'monthNum':
      return new Intl.DateTimeFormat('en-US', { month: 'numeric'}).format(dt);
    case 'monthStr':
      return new Intl.DateTimeFormat('en-US', { month: '2-digit'}).format(dt);
    case 'year':
      return dt.getFullYear();    
    default:
      return '';
  }
}
