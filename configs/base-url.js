var url = require('url');

module.exports = function( request ){
    return '//' + request.headers.host;
}
