// @ts-nocheck
// function to shorten text and replace the cutoff with ellipses
function truncateString(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
        ret = ret.substr(0,maxLength-3) + '&hellip;';
    }
    return ret;
}
