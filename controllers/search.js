var boom = require('boom');
var es = require('../configs/es');
var joi = require('joi');
var paginate = require('handlebars-paginate');
var Handlebars = require('handlebars');
var template = require('../views/layout/template.hbs');
Handlebars.registerHelper('paginate', paginate);

function controller(request, reply) {
    // request.params.term = request.params.term.replace(/\+/g, ' ');
    request.params.term = request.query.q;

    // if (!request.params.term) {
    //     return reply.redirect('/');
    // }

    controller.validate(request)
        .then(function(result) {
            return controller.find(result);
        })
        .then(function(result) {
            return reply.view('search', result);
        })
        .catch(reply);
}

controller.validate = function(request) {
    return new Promise(function(resolve, reject) {
        var params = {
            q: request.params.term,
            page: request.query.page,
            perPage: request.query.perPage
        };

        var schema = {
            q: joi.string(),
            page: joi.number().min(1).default(1),
            perPage: joi.number().min(1).default(30)
        };

        joi.validate(params, schema, function(err, result) {
            if (err) {
                reject(boom.badRequest(err));
            }

            resolve(result);
        });
    });
};

controller.find = function(params) {
    return new Promise(function(resolve, reject) {
        var options = {
            index: 'customelements',
            type: 'repo',
            sort: 'stargazers_count:desc',
            q: params.q + '*',
            size: params.perPage,
            from: (params.page - 1) * params.perPage
        };

        es.search(options).then(function(body) {
            var results = [];

            for (var i = 0; i < body.hits.hits.length; i++) {
                results.push(body.hits.hits[i]._source);
            }

            var response = {
                q: params.q,
                total: body.hits.total,
                results: results
            }

            var html = template({pagination: {
              page: params.page,
              pageCount: Math.ceil(body.hits.total / params.perPage)
            }});

            if ( Math.ceil(body.hits.total / params.perPage) > 1 ) {
                response.pagination = html;
            }

            resolve(response);

        }, function (error) {
            reject(boom.create(error.status, error.message));
        });
    });
};

module.exports = controller;
