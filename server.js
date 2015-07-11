require('newrelic');

var Hapi = require('hapi');

// -- Setup --------------------------------------------------------------------

var server = new Hapi.Server();

server.connection({
    port: process.env.PORT || 4000,
    router: {
        stripTrailingSlash: true
    }
});

server.route(require('./routes'));

server.views({
    engines: {
        html: require('handlebars')
    },
    path: 'views',
    helpersPath: 'views/helpers',
    layoutPath: 'views/layout',
    layout: 'default'
});

// -- Start --------------------------------------------------------------------

server.register({
    register: require('good'),
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                log: '*',
                error: '*'
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
