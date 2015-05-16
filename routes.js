module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: require('./controllers/get.js')
    },
    {
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: { path: 'assets' }
        }
    }
];
