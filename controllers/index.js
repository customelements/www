var boom = require('boom');
var es = require('../configs/es');

function controller(request, reply) {
    Promise.all([
        controller.recentlyCreated(),
        controller.lastUpdated(),
        controller.mostPopular()
    ])
    .then(function(results) {
        reply.view('index', {
            recentlyCreated: results[0],
            lastUpdated: results[1],
            mostPopular: results[2]
        });
    })
    .catch(reply);
}

controller.recentlyCreated = function(data) {
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

controller.lastUpdated = function(data) {
    return new Promise(function(resolve, reject) {
        es.search({
            index: 'customelements',
            type: 'repo',
            sort: 'pushed_at:desc',
            size: 3,
        }).then(function(body) {
            resolve(body.hits.hits);
        }, function (error) {
            reject(boom.wrap(error));
        });
    });
};

controller.mostPopular = function(data) {
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

module.exports = controller;