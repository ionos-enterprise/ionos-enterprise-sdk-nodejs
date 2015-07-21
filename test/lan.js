/**
 * Created by ssabic on 07/07/15.
 */
var assert = require('assert');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var dc = {};
var lan = {};

var lanJson = {
    "properties": {
        "public": "true",
        "name": "Test LAN"
    }
};

describe('LAN tests', function(){
    this.timeout(80000);

    before(function(done){
        dcData = {
            "properties": {
                "name":"Test Data Center",
                "location":"us/lasdev",
                "description":"Test description"
            }
        };

        helper.authenticate(pb);
        pb.createDatacenter(dcData, function(error, response, body){
            assert.equal(error, null);
            dc = JSON.parse(body);
            done();
        });
    });

    after(function(done){
        pb.deleteDatacenter(dc.id, function(error, response, body){
            assert.equal(error, null);
            done();
        });
    });

    it('List lans - empty datacenter', function(done){
        pb.listLans(dc.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.items.length, 0);
            done();
        });
    });

    it('Create lan', function(done){
        pb.createLan(dc.id, lanJson, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.properties.name, lanJson.properties.name);
            assert.equal(object.properties.public, true);
            lan = object;
            done();
        });
    });

    it('List lans', function(done){
        setTimeout(function(){
            pb.listLans(dc.id, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.items.length, 1);
                done();
            });
        }, 5000);
    });

    it('Get lan', function(done){
        pb.getLan(dc.id, lan.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, lan.id);
            assert.equal(object.properties.name, lan.properties.name);
            assert.equal(object.properties.public, lan.properties.public);
            lan = object;
            done();
        });
    });

    it('Update lan', function(done){
        lanJson.properties.name = 'Test LAN - updated';
        pb.updateLan(dc.id, lan.id, lanJson, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            setTimeout(function(){
                pb.getLan(dc.id, lan.id, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.id, lan.id);
                    assert.equal(object.properties.name, lanJson.properties.name);
                    assert.equal(object.properties.public, lan.properties.public);
                    lan = object;
                    done();
                });
            }, 5000);
        });
    });

    it('Patch lan', function(done){
        var lanPatch = {
            "name": "Test LAN"
        };
        pb.patchLan(dc.id, lan.id, lanPatch, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            setTimeout(function(){
                pb.getLan(dc.id, lan.id, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.id, lan.id);
                    assert.equal(object.properties.name, lanPatch.name);
                    assert.equal(object.properties.public, lan.properties.public);
                    lan = object;
                    done();
                });
            }, 5000);
        });
    });

    it('List LAN members', function(done){
        pb.listLanMembers(dc.id, lan.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, lan.id + "/nics");
            assert.equal(object.items.length, 0);
            done();
        });
    });

    it('Delete lan', function(done){
        pb.deleteLan(dc.id, lan.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, "");
            done();
        });
    });

});
