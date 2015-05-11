var elasticsearch = require('elasticsearch');

module.exports = function() {
    var client = new elasticsearch.Client({
        host: process.env.FOUNDELASTICSEARCH_URL
    });

    return client;
}();