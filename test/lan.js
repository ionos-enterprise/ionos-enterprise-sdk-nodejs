/**
 * Created by ssabic on 07/07/15.
 */
var assert = require('assert');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var config = require('../test/config');
var dc = {};
var lan = {};

describe('LAN tests', function(){
    this.timeout(80000);

    before(function(done){
        helper.authenticate(pb);
        pb.createDatacenter(config.dcData, function(error, response, body){
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
        pb.createLan(dc.id, config.lan, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.type, 'lan');
            assert.equal(object.properties.name, config.lan.properties.name);
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
                assert.equal(object.items[0].type, 'lan');
                assert.equal(object.items.length, 1);
                done();
            });
        }, 15000);
    });

    it('Get lan', function(done){
        pb.getLan(dc.id, lan.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.type, 'lan');
            assert.equal(object.id, lan.id);
            assert.equal(object.properties.name, lan.properties.name);
            assert.equal(object.properties.public, lan.properties.public);
            lan = object;
            done();
        });
    });

    it('Get LAN failure', function (done) {
        pb.getLan(dc.id, 0, function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('Create LAN failure', function (done) {
        pb.createLan('00000000-0000-0000-0000-000000000000', config.lan, function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('Patch lan', function(done){
        var lanPatch = {
            "name": config.lan.properties.name + ' - RENAME',
            "public": false
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
                    assert.equal(object.type, 'lan');
                    assert.equal(object.id, lan.id);
                    assert.equal(object.properties.name, lanPatch.name);
                    assert.equal(object.properties.public, false);
                    lan = object;
                    done();
                });
            }, 15000);
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
            assert.equal(response.statusCode, 202);
            assert.equal(body, "");
            done();
        });
    });

});
