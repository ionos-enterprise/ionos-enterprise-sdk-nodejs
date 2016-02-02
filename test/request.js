/**
 * Created by ssabic on 09/07/15.
 */
var assert = require('assert');
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