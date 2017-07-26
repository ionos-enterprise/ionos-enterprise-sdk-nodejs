/**
 * Created by ssabic on 09/07/15.
 */
var assert = require('assert-plus');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');

var req = {};

describe('Request tests', function(){
    this.timeout(20000);

    before(function(done){
        helper.authenticate(pb);
        done();
    });

    it('List requests', function(done){
        pb.listRequests(function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.items.length > 0, true);
            assert.equal(object.items[0].type, "request");
            req = object.items[object.items.length - 1];
            done();
        });
    });

    it('Get request', function(done){
        pb.getRequest(req.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, req.id);
            assert.equal(object.type, "request");
            done();
        });
    });

    it('Get request failure', function (done) {
        pb.getRequest('00000000-0000-0000-0000-000000000000', function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('Status request', function(done){
        pb.statusRequest(req.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, req.id + '/status');
            assert.equal(object.type, "request-status");
            assert.notEqual(object.metadata.status, null);
            done();
        });
    });
});