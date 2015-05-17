module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: require('./controllers/index')
    },
    {
        method: 'GET',
        path: '/assets/{param*}',
    {
        method: 'GET',
        path: '/{owner}',
        handler: require('./controllers/owner')
    },
        handler: {
            directory: { path: 'assets' }
        }
    }
];
