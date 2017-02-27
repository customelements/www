var request = require('request');

function controller(request, reply) {
    reply.redirect('https://www.webcomponents.org').permanent(true);
}

module.exports = controller;
