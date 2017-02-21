var request = require('request');

function controller(request, reply) {
    reply.redirect('https://www.webcomponents.org/search/' + request.params.term).permanent(true);
}

module.exports = controller;
