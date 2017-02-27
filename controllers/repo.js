var request = require('request');

function controller(request, reply) {
    reply.redirect('https://www.webcomponents.org/element/' + request.params.owner + '/' + request.params.repo).permanent(true);
}

module.exports = controller;