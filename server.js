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

// -- Error --------------------------------------------------------------------

server.ext('onPreResponse', function (request, reply) {
    if (request.response.output) {
        if (request.response.output.statusCode === 404) {
            return reply.view('error', {
                page_title: 'Error 404 • CustomElements.io',
                page_description: 'Uh-oh! We couldn\'t find the page you are looking for',
                error_img: '404'
            });
        }
        else if (request.response.output.statusCode === 400) {
            return reply.view('error', {
                page_title: 'Error 400 • CustomElements.io',
                page_description: 'Argh! No results were found, try a different search',
                error_img: '400'
            });
        }
    }

    if (request.response.isBoom) {
        return reply.view('error', {
            page_title: 'Error 500 • CustomElements.io',
            page_description: 'Oops! An unexpected error seems to have occurred',
            error_img: '500'
        });
    }

    return reply.continue();
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
