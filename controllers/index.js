var boom = require('boom');
var request = require('request');
var url = require('../configs/base-url');

function controller(request, reply) {
    if (request.query && request.query.q) {
        return reply.redirect('/search/' + request.query.q);
    }

    Promise.all([
        controller.recentlyCreated(),
        controller.lastUpdated(),
        controller.mostPopular()
    ])
    .then(function(results) {
        reply.view('index', {
            recentlyCreated: results[0],
            lastUpdated: results[1],
            mostPopular: results[2],
            base_url: url(request)
        });
    })
    .catch(reply);
}

controller.recentlyCreated = function(data) {
    return new Promise(function(resolve, reject) {
        request({
            url: 'https://api.customelements.io/search/repos?sort=created_at&order=desc&perPage=5',
            json: true,
        }, function (error, response, body) {
            if (error) {
                reject(boom.wrap(error));
            }
            else if (response.statusCode !== 200) {
                var errorMsg = 'Error when requesting: Recently Created';
                reject(boom.create(response.statusCode, errorMsg));
            }
            else {
                resolve(body.results);
            }
        });
    });
};

controller.lastUpdated = function(data) {
    return new Promise(function(resolve, reject) {
        request({
            url: 'https://api.customelements.io/search/repos?sort=pushed_at&order=desc&perPage=5',
            json: true,
        }, function (error, response, body) {
            if (error) {
                reject(boom.wrap(error));
            }
            else if (response.statusCode !== 200) {
                var errorMsg = 'Error when requesting: Recently Created';
                reject(boom.create(response.statusCode, errorMsg));
            }
            else {
                resolve(body.results);
            }
        });
    });
};

controller.mostPopular = function(data) {
    return new Promise(function(resolve, reject) {
        request({
            url: 'https://api.customelements.io/search/repos?sort=stargazers_count&order=desc&perPage=5',
            json: true,
        }, function (error, response, body) {
            if (error) {
                reject(boom.wrap(error));
            }
            else if (response.statusCode !== 200) {
                var errorMsg = 'Error when requesting: Recently Created';
                reject(boom.create(response.statusCode, errorMsg));
            }
            else {
                resolve(body.results);
            }
        });
    });
};

module.exports = controller;
