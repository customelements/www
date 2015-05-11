module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: require('./controllers/get.js')
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public',
                listing: true
            }
        }
    }
];
