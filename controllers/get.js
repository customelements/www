var boom = require('boom');
var es = require('../configs/es');

function controller(request, reply) {
    Promise.all([controller.latest(), controller.popular(), controller.firstPage()])
        .then(function(results) {
            reply.view('index', {
                latest: results[0],
                popular: results[1],
                firstPage: results[2]
            });
        })
        .catch(reply);
}

controller.latest = function(data) {
    return new Promise(function(resolve, reject) {
        es.search({
            index: 'customelements',
            type: 'repo',
            sort: 'created_at:desc',
            size: 3,
        }).then(function(body) {
            resolve(body.hits.hits);
        }, function (error) {
            reject(boom.wrap(error));
        });
    });
};

controller.popular = function(data) {
    return new Promise(function(resolve, reject) {
        es.search({
            index: 'customelements',
            type: 'repo',
            sort: 'stargazers_count:desc',
            size: 3,
        }).then(function(body) {
            resolve(body.hits.hits);
        }, function (error) {
            reject(boom.wrap(error));
        });
    });
};

controller.firstPage = function(data) {
    return new Promise(function(resolve, reject) {
        es.search({
            index: 'customelements',
            type: 'repo',
            sort: 'stargazers_count:desc',
            size: 30
        }).then(function(body) {
            resolve(body.hits.hits);
        }, function (error) {
            reject(boom.wrap(error));
        });
    });
};

module.exports = controller;