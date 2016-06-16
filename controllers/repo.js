var boom = require('boom');
var moment = require('moment');
var request = require('request');
var sanitizer = require('sanitizer');
var github = require('../configs/github');

function controller(request, reply) {
    Promise.all([
        controller.getRepo(request.params.owner, request.params.repo),
        controller.getReadme(request.params.owner, request.params.repo)
    ])
    .then(function(results) {
        var pageTitle = results[0].owner.login + '/' + results[0].name + ' · CustomElements.io';
        var pageDescription = results[0].description || results[0].name + ' web component created by ' + results[0].owner.login;

        pageDescription = sanitizer.escape(pageDescription)

        results[0].created_at = moment(results[0].created_at).fromNow();
        results[0].pushed_at = moment(results[0].pushed_at).fromNow();

        reply.view('repo', {
            page_title: pageTitle,
            page_description: pageDescription,
            repo: results[0],
            readme: results[1]
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

controller.getReadme = function(owner, repo) {
    return new Promise(function(resolve, reject) {
        github.repos.getReadme({
            user: owner,
            repo: repo,
            headers: {
                'Accept': 'application/vnd.github.v3.html'
            }
        }, function(error, response) {
            resolve(response);
        });
    });
};

module.exports = controller;