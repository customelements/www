var boom = require('boom');
var es = require('../configs/es');
var joi = require('joi');

function controller(request, reply) {
    controller.validate(request)
        .then(function(result) {
            return controller.find(result);
        })
        .then(function(result) {
            return reply.view('owner', result);
        })
        .catch(reply);
}

controller.validate = function(request) {
    return new Promise(function(resolve, reject) {
        var params = { owner: request.params.owner };
        var schema = { owner: joi.string() };

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
                                    { term: { owner: params.owner.toLowerCase() }}
                                ]
                            }
                        }
                    }
                }
            }
        };

        es.search(options).then(function(body) {
            var results = [];

            for (var i = 0; i < body.hits.hits.length; i++) {
                results.push(body.hits.hits[i]._source);
            }

            resolve({
                owner: params.owner,
                results: results
            });
        }, function (error) {
            reject(boom.create(error.status, error.message));
        });
    });
};

module.exports = controller;