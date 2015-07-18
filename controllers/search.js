var boom = require('boom');
var request = require('request');
var joi = require('joi');
var paginate = require('handlebars-paginate');
var Handlebars = require('handlebars');
var template = require('../views/layout/template.hbs');
var url = require('../configs/base-url');
Handlebars.registerHelper('paginate', paginate);

function controller(request, reply) {
    request.params.term = request.params.term.replace(/\+/g, ' ').replace(/\-/g, ' ');

    controller.find(request)
        .then(function(result) {
            result.base_url = url(request);
            return reply.view('search', result);
        })
        .catch(reply);
}

controller.find = function(search) {
    return new Promise(function(resolve, reject) {

        // Params Default
        var params = [];
            params.push('q=' + search.params.term);

        if ( search.query.page ) {
            params.push('page=' + search.query.page);
        }

        if ( search.query.perPage ) {
            params.push('perPage=' + search.query.perPage);
        }

        if ( search.query.s ) {
            var sort = search.query.s.split(':')
            params.push('sort=' + sort[0])
            params.push('order=' + sort[1])
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

                body.q = search.params.term
                if ( search.query.s ) {
                    body.sort = search.query.s
                }

                var html = template({
                    pagination: {
                        page: body.page,
                        pageCount: Math.ceil(body.total / body.pages)
                    }
                });

                if (Math.ceil(body.total / body.pages) > 1) {
                    body.pagination = html;
                }

                resolve(body);
            }
        });
    });
};

module.exports = controller;
