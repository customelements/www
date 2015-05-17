module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: require('./controllers/index')
    },
    {
        method: 'GET',
        path: '/search',
        handler: require('./controllers/search')
    },
    {
        method: 'GET',
        path: '/{owner}',
        handler: require('./controllers/owner')
    },
    {
        method: 'GET',
        path: '/{owner}/{name}',
        config: {
            handler: require('./controllers/repo')
        }
    },
    {
        method: 'GET',
        path: '/assets/{file*}',
        handler: {
            directory: { path: 'assets' }
        }
    }
];