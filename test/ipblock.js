/**
 * Created by ssabic on 07/07/15.
 */
var assert = require('assert');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var ipblock = {};
var ipblockJson = {
    "properties": {
        "location": "us/las",
        "size": "4"
    }
};

describe('IP block tests', function(){
    this.timeout(80000);

    before(function(done){
        helper.authenticate(pb);
        done();
    });

    it('List IP blocks', function(done){
        pb.listIpblocks(function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, 'ipblocks');
            //ipblock = object.items[0];
            done();
        });
    });

    it('Reserve IP block', function(done){
        pb.reserveIpblock(ipblockJson, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.properties.location, ipblockJson.properties.location);
            assert.equal(object.properties.size, ipblockJson.properties.size);
            assert.equal(object.properties.ips.length, ipblockJson.properties.size);
            ipblock = object;
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
            assert.equal(object.properties.location, ipblock.properties.location);
            assert.equal(object.properties.size, ipblock.properties.size);
            assert.equal(object.properties.ips.length, ipblock.properties.size);
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
