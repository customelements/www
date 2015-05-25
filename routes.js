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
    // {
    //     method: 'GET',
    //     path: '/{owner}',
    //     handler: require('./controllers/owner')
    // },
    // {
    //     method: 'GET',
    //     path: '/{owner}/{name}',
    //     config: {
    //         handler: require('./controllers/repo')
    //     }
    // },
    {
        method: 'GET',
        path: '/assets/{file*}',
        handler: {
            directory: { path: 'assets' }
        }
    },
    {
        method: 'GET',
        path: '/{p*}',
        handler: function(request, reply) {
            return reply.view('404')
        }
    }
];
