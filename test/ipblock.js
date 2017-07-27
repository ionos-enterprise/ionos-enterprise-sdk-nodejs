/**
 * Created by ssabic on 07/07/15.
 */
var assert = require('assert-plus');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var config = require('../test/config');
var ipblock = {};

describe('IP block tests', function(){
    this.timeout(80000);

    before(function(done){
        helper.authenticate(pb);
        done();
    });

    it('Reserve IP block', function(done){
        pb.reserveIpblock(config.ipblock, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.properties.name, config.ipblock.properties.name);
            assert.equal(object.properties.location, config.ipblock.properties.location);
            assert.equal(object.properties.size, config.ipblock.properties.size);
            assert.equal(object.properties.ips.length, config.ipblock.properties.size);
            ipblock = object;
            done();
        });
    });

    it('Reserve IP block failure', function (done) {
        var ipReq = {
            "properties": {
                "name": "NodeJS SDK Test",
                "size": 1
            }
        };
        pb.reserveIpblock(ipReq, function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 422);
            assert.ok(object['messages'][0]['message'].indexOf("Attribute 'location' is required") > -1);
            done();
        });
    });

    it('List IP blocks', function (done) {
        pb.listIpblocks(function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.ok(object.items.length > 0);
            assert.equal(object.items[0].type, 'ipblock');
            done();
        });
    });

    it('Get IP block', function(done){
        pb.getIpblock(ipblock.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, ipblock.id);
            assert.equal(object.properties.name, config.ipblock.properties.name);
            assert.equal(object.properties.location, ipblock.properties.location);
            assert.equal(object.properties.size, ipblock.properties.size);
            assert.equal(object.properties.ips.length, ipblock.properties.size);
            done();
        });
    });

    it('Get IP block failure', function (done) {
        pb.getIpblock('00000000-0000-0000-0000-000000000000', function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('Release IP block', function(done){
        pb.releaseIpblock(ipblock.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, "");
            done();
        });
    });

});
