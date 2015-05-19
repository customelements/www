var boom = require('boom');
var es = require('../configs/es');
var joi = require('joi');

function controller(request, reply) {
    controller.validate(request)
        .then(function(result) {
            return controller.find(result);
        })
        .then(function(result) {
            return controller.reduce(result);
        })
        .then(function(result) {
            result.owner = request.params.owner;
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
            resolve(body);
        }, function (error) {
            reject(boom.create(error.status, error.message));
        });
    });
};

controller.reduce = function(body) {
    return new Promise(function(resolve, reject) {
        var results = [];

        if (body.hits.total === 0) {
            reject(boom.notFound());
            return;
        }

        for (var i = 0; i < body.hits.hits.length; i++) {
            results.push(body.hits.hits[i]._source);
        }

        resolve({
            total: body.hits.total,
            results: results
        });
    });
};

module.exports = controller;