var emojify = require('emojify.js');
var imagePath = '//assets-cdn.github.com/images/icons/emoji/';

// Ignore emoticons like :)
emojify.setConfig({
    ignore_emoticons: true
});

function replacer(emoji, shortName) {
    var img = '<img ';
    img += 'class="emoji" ';
    img += 'title=":' + shortName + ':" ';
    img += 'alt=":' + shortName + ':" ';
    img += 'src="' + imagePath + shortName + '.png">';
    return img;
}

module.exports = function render_emoji(content) {
    return emojify.replace(content, replacer);
};