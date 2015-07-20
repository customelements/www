module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: require('./controllers/index')
    },
    {
        method: 'GET',
        path: '/search',
        handler: function(request, reply) {
            return reply.redirect('/');
        }
    },
    {
        method: 'GET',
        path: '/search/{term}',
        handler: require('./controllers/search')
    },
    {
        method: 'GET',
        path: '/assets/{file*}',
        handler: {
            directory: { path: 'assets' }
        }
    }
];
