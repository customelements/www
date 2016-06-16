var GitHub = require('github');

module.exports = function() {
    var github = new GitHub({
        version: '3.0.0',
    });

    if (process.env.GITHUB_CLIENT_ID &&
        process.env.GITHUB_CLIENT_SECRET) {
        github.authenticate({
            type: 'oauth',
            key: process.env.GITHUB_CLIENT_ID,
            secret: process.env.GITHUB_CLIENT_SECRET
        });
    }

    return github;
}();