var Lab = require('lab');
var lab = exports.lab = Lab.script();

var assert = require('chai').assert;
var server = require('../server');

lab.experiment('GET /', function() {
    lab.test('should return HTTP 200 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/'
        };

        server.inject(options, function(response) {
            assert.equal(response.statusCode, 200);
            done();
        });
    });
});
