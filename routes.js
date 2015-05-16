module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: require('./controllers/index')
    },
    {
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: { path: 'assets' }
        }
    }
];
