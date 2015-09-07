var boom = require('boom');
var moment = require('moment');
var request = require('request');

function controller(request, reply) {
    controller.getRepo(request.params.owner, request.params.repo)
        .then(function(result) {
            var pageTitle = result.owner.login + '/' + result.name + ' · CustomElements.io';
            var pageDescription = result.description || result.name + ' web component created by ' + result.owner.login;

            result.created_at = moment(result.created_at).fromNow();
            result.pushed_at = moment(result.pushed_at).fromNow();

            reply.view('repo', {
                page_title: pageTitle,
                page_description: pageDescription,
                repo: result
            });
        })
        .catch(reply);
}

controller.getRepo = function(owner, repo) {
    return new Promise(function(resolve, reject) {
        request({
            url: 'https://api.customelements.io/repos/' + owner + '/' + repo,
            json: true
        }, function (error, response, body) {
            if (error) {
                reject(boom.wrap(error));
            }
            else if (response.statusCode !== 200) {
                var errorMsg = 'Error when requesting: repos/' + owner + '/' + repo;
                reject(boom.create(response.statusCode, errorMsg));
            }
            else {
                resolve(body);
            }
        });
    });
};

module.exports = controller;