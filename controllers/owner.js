var request = require('request');

function controller(request, reply) {
    reply.redirect('https://www.webcomponents.org/author/' + request.params.owner).permanent(true);
}

module.exports = controller;