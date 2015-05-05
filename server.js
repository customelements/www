require('newrelic');

var Hapi = require('hapi');

// -- Setup --------------------------------------------------------------------

var server = new Hapi.Server();

server.connection({
    port: process.env.PORT || 3000
});

server.route(require('./routes'));

// -- Start --------------------------------------------------------------------

server.register({
    register: require('good'),
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                log: '*',
                error: '*',
                request: '*',
                response: '*'
            }
        }]
    }
}, function (err) {
    if (err) {
        throw err;
    }

    if (!module.parent) {
        server.start(function () {
            server.log('info', 'Server running at: ' + server.info.uri);
        });
    }
});

module.exports = server;
