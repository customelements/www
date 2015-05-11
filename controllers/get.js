var boom = require('boom');
var es = require('../configs/es');

function controller(request, reply) {
    Promise.all([
        controller.mostRecent(), controller.lastUpdate(),
        controller.mostPopular(), controller.firstPage()
    ])
    .then(function(results) {
        reply.view('index', {
            created: results[0],
            updated: results[1],
            popular: results[2],
            firstPage: results[3]
        });
    })
    .catch(reply);
}

controller.mostRecent = function(data) {
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

controller.lastUpdate = function(data) {
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