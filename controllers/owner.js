var boom = require('boom');
var request = require('request');
var system = require('../configs/system');

function controller(request, reply) {
    Promise.all([
        controller.getOwner(request.params.owner),
        controller.getRepos(request.params.owner)
    ])
    .then(function(results) {
        var pageTitle = request.params.owner + ' • CustomElements.io';
        var pageDescription = 'Listing ' + results[1].length + ' repo(s) from ' + request.params.owner;

        reply.view('owner', {
            page_title: pageTitle,
            page_description: pageDescription,
            owner: results[0],
            repos: results[1]
        });
    })
    .catch(reply);
}

controller.getOwner = function(owner) {
    return new Promise(function(resolve, reject) {
        request({
            url: system.api_url + '/owners/' + owner,
            json: true
        }, function (error, response, body) {
            if (error) {
                reject(boom.wrap(error));
            }
            else if (response.statusCode !== 200) {
                var errorMsg = 'Error when requesting: owners/' + owner;
                reject(boom.create(response.statusCode, errorMsg));
            }
            else {
                resolve(body);
            }
        });
    });
};

controller.getRepos = function(owner) {
    return new Promise(function(resolve, reject) {
        request({
            url: system.api_url + '/repos/' + owner,
            json: true
        }, function (error, response, body) {
            if (error) {
                reject(boom.wrap(error));
            }
            else if (response.statusCode !== 200) {
                var errorMsg = 'Error when requesting: repos/' + owner;
                reject(boom.create(response.statusCode, errorMsg));
            }
            else {
                resolve(body);
            }
        });
    });
};

module.exports = controller;
