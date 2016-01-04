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
        controller.mostPopular(),
        controller.sponsored(),
        controller.totalRepos(),
        controller.totalOwners()
    ])
    .then(function(results) {
        var pageTitle = 'CustomElements.io · Explore the world of Web Components';
        var pageDescription = 'CustomElements.io is where community find awesome Web Components. Featuring more than ' + results[3] + ' repositories from ' + results[4] + ' authors.';

        reply.view('index', {
            base_url: url(request),
            page_title: pageTitle,
            page_description: pageDescription,
            recently_created: results[0],
            last_updated: results[1],
            most_popular: results[2],
            sponsored: results[3],
            total_repos: results[4],
            total_owners: results[5]
        });
    })
    .catch(reply);
}

controller.recentlyCreated = function(data) {
    return new Promise(function(resolve, reject) {
        request({
            url: 'https://api.customelements.io/search/repos?sort=created_at&order=desc&perPage=3',
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
            url: 'https://api.customelements.io/search/repos?sort=pushed_at&order=desc&perPage=3',
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
            url: 'https://api.customelements.io/search/repos?sort=stargazers_count&order=desc&perPage=3',
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

controller.sponsored = function() {
    return Promise.all([
        controller.firstSponsored(),
        controller.secondSponsored()
    ]);
};

controller.firstSponsored = function(data) {
    return new Promise(function(resolve, reject) {
        request({
            url: 'http://api.customelements.io/repos/vaadin/vaadin-core-elements',
            json: true,
        }, function (error, response) {
            if (error) {
                reject(boom.wrap(error));
            }
            else if (response.statusCode !== 200) {
                var errorMsg = 'Error when requesting: First Sponsored';
                reject(boom.create(response.statusCode, errorMsg));
            }
            else {
                resolve(response.body);
            }
        });
    });
};

controller.secondSponsored = function(data) {
    return new Promise(function(resolve, reject) {
        request({
            url: 'http://api.customelements.io/repos/vaadin/vaadin-charts',
            json: true,
        }, function (error, response) {
            if (error) {
                reject(boom.wrap(error));
            }
            else if (response.statusCode !== 200) {
                var errorMsg = 'Error when requesting: Second Sponsored';
                reject(boom.create(response.statusCode, errorMsg));
            }
            else {
                resolve(response.body);
            }
        });
    });
};

controller.totalRepos = function(data) {
    return new Promise(function(resolve, reject) {
        request({
            url: 'https://api.customelements.io/count/repos',
            json: true,
        }, function (error, response, body) {
            if (error) {
                reject(boom.wrap(error));
            }
            else if (response.statusCode !== 200) {
                var errorMsg = 'Error when requesting: Count repos';
                reject(boom.create(response.statusCode, errorMsg));
            }
            else {
                resolve(body.count);
            }
        });
    });
};

controller.totalOwners = function(data) {
    return new Promise(function(resolve, reject) {
        request({
            url: 'https://api.customelements.io/count/owners',
            json: true,
        }, function (error, response, body) {
            if (error) {
                reject(boom.wrap(error));
            }
            else if (response.statusCode !== 200) {
                var errorMsg = 'Error when requesting: Count owners';
                reject(boom.create(response.statusCode, errorMsg));
            }
            else {
                resolve(body.count);
            }
        });
    });
};

module.exports = controller;
