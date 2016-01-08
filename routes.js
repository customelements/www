module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: require('./controllers/index')
    },
    {
        method: 'GET',
        path: '/search/{term*}',
        handler: require('./controllers/search')
    },
    {
        method: 'GET',
        path: '/assets/{file*}',
        handler: {
            directory: { path: 'assets' }
        }
    },
    {
        method: 'GET',
        path: '/{owner}',
        handler: require('./controllers/owner.js')
    },
    {
        method: 'GET',
        path: '/{owner}/{repo}',
        handler: require('./controllers/repo.js')
    }
];
