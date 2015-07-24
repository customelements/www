module.exports = function normalize_link(url) {
    if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
        return 'http://' + url;
    }

    return url;
};