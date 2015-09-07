var boom = require('boom');
var request = require('request');
var joi = require('joi');
var Handlebars = require('handlebars');
var template = require('../views/layout/template.hbs');
var url = require('../configs/base-url');

Handlebars.registerHelper('paginate', require('handlebars-paginate'));

function controller(request, reply) {
    controller.find(request)
        .then(function(results) {
            var pageTitle = 'Search results for "' + request.params.term + '" · CustomElements.io';
            var pageDescription = 'Listing ' + results.total + ' search results for "' + request.params.term + '"';

            return reply.view('search', {
                base_url: url(request),
                page_title: pageTitle,
                page_description: pageDescription,
                search: results
            });
        })
        .catch(reply);
}

controller.find = function(search) {
    return new Promise(function(resolve, reject) {

        // Params Default
        var params = [];
            params.push('q=' + search.params.term);

        search.query.page = search.query.page || 1;
        params.push('page=' + search.query.page);

        search.query.perPage = search.query.perPage || 15;
        params.push('perPage=' + search.query.perPage);

        if ( search.query.s ) {
            var sort = search.query.s.split(':')
            params.push('sort=' + sort[0]);
            params.push('order=' + sort[1]);
        }
        else {
            params.push('order=desc');
        }

        request({
            url: 'https://api.customelements.io/search/repos?' + params.join('&'),
            json: true
        }, function (error, response, body) {
            if (error) {
                reject(boom.wrap(error));
            }
            else if (response.statusCode !== 200) {
                var errorMsg = 'Error when requesting: find => ' + params.join('&');
                reject(boom.create(response.statusCode, errorMsg));
            }
            else {
                if (body.total === 0) {
                    reject(boom.create(400, 'No results were found'));
                }

                body.q = search.params.term
                if ( search.query.s ) {
                    body.sort = search.query.s
                }

                if (body.pages > 1) {
                    body.pagination = template({
                        pagination: {
                            page: body.page,
                            pageCount: body.pages
                        }
                    });
                }

                resolve(body);
            }
        });
    });
};

module.exports = controller;
