var boom = require('boom');
var es = require('../configs/es');
var joi = require('joi');

function controller(request, reply) {
    controller.validate(request)
        .then(function(result) {
            return controller.find(result);
        })
        .then(function(result) {
            return reply.view('repo', result);
        })
        .catch(reply);
}

controller.validate = function(request) {
    return new Promise(function(resolve, reject) {
        var params = {
            owner: request.params.owner,
            name: request.params.name
        };

        var schema = {
            owner: joi.string(),
            name: joi.string()
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
            body: {
                query: {
                    filtered: {
                        filter: {
                            bool: {
                                must: [
                                    { term: { 'owner': params.owner.toLowerCase() }},
                                    { term: { 'name.original': params.name.toLowerCase() }}
                                ]
                            }
                        }
                    }
                }
            }
        };

        es.search(options).then(function(body) {
            if (body.hits.total === 0) {
                reject(boom.notFound());
                return;
            }

            resolve(body.hits.hits[0]._source);
        }, function (error) {
            reject(boom.create(error.status, error.message));
        });
    });
};

module.exports = controller;