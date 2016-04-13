var sanitizer = require('sanitizer');

module.exports = function trim_string(passedString, charLimit) {
    passedString = passedString || '';
    var resultString = passedString.substring(0, charLimit);

    if (resultString.length === charLimit) {
        resultString += '...';
    }

    return sanitizer.escape(resultString);
};
