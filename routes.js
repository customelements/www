module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: function (response, reply) {
            reply.file('index.html');
        }
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
