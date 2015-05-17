module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: require('./controllers/index')
    },
    {
        method: 'GET',
    {
        method: 'GET',
        path: '/{owner}',
        handler: require('./controllers/owner')
    },
    {
        method: 'GET',
        path: '/assets/{file*}',
        handler: {
            directory: { path: 'assets' }
        }
    }
];