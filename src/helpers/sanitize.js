module.exports = function(html) {
  return html.replace(/<[^>]+>/g, '').replace(/\&[^;]{3,6};/g, '');
};