var boom = require('boom');
var request = require('request');

function controller(request, reply) {
    Promise.all([
        controller.getOwner(request.params.owner),
        controller.getRepos(request.params.owner)
    ])
    .then(function(results) {
        reply.view('owner', {
            owner: results[0],
            repos: results[1]
        });
    })
    .catch(reply);
}

controller.getOwner = function(owner) {
    return new Promise(function(resolve, reject) {
        request({
            url: 'https://api.customelements.io/owners/' + owner,
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
            url: 'https://api.customelements.io/repos/' + owner,
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