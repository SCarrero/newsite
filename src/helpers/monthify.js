module.exports = function(str) {
  const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  const num = parseInt(str);
  return months[num - 1];
};