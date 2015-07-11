var assert = require('assert');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var dc = {};
var dcData = {};

describe('Datacenter tests', function(){
    this.timeout(60000);

    before(function(done){
        dcData = {
            "properties": {
                "name":"Test Data Center",
                "location":"us/lasdev",
                "description":"Test description"
            }
        };

        helper.authenticate(pb);
        done();
    });

    it('List datacenters', function(done){
        pb.listDatacenters(function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.items.length > 0, true)
            done();
        });
    });

    it('Create datacenter', function(done){
        pb.createDatacenter(dcData, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            assert.equal(object.properties.name, dcData.properties.name);
            assert.equal(object.properties.location, dcData.properties.location);
            assert.equal(object.properties.description, dcData.properties.description);
            dc = object;
            done();
        });
    });

    it('Get datacenter', function(done){
        setTimeout(function(){
            pb.getDatacenter(dc.id, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, dc.id);
                assert.equal(object.properties.name, dc.properties.name);
                assert.equal(object.properties.location, dc.properties.location);
                assert.equal(object.properties.description, dc.properties.description);
                done();
            });
        }, 10000);
    });

    it('Update datacenter', function(done){
        updateData = {
            "properties":{
                "name": "Test DC - UPDATED",
                "description": "This datacenter is updated using node.js SDK"
            }
        };
        setTimeout(function(){
            pb.updateDatacenter(dc.id, updateData, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, dc.id);
                assert.equal(object.properties.name, updateData.properties.name);
                assert.equal(object.properties.location, dc.properties.location);
                assert.equal(object.properties.description, updateData.properties.description);
                done();
            });
        }, 20000);
    });

    it('Patch datacenter', function(done){
        patchData = {
            "name": "Test DC - PATCHED",
            "description": "This datacenter is patched using node.js SDK"
        };
        setTimeout(function(){
            pb.patchDatacenter(dc.id, patchData, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, dc.id);
                assert.equal(object.properties.name, patchData.name);
                assert.equal(object.properties.location, dc.properties.location);
                assert.equal(object.properties.description, patchData.description);
                done();
            });
        }, 20000);
    });

    it('Delete datacenter', function(done){
        setTimeout(function(){
            pb.deleteDatacenter(dc.id, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.equal(body, '');
                setTimeout(function () {
                    pb.getDatacenter(dc.id, function(error, response, body){
                        assert.equal(error, null);
                        var object = JSON.parse(body);
                        assert.equal(object.messages[0].errorCode, '309');
                        assert.equal(object.messages[0].message, 'Resource does not exist');
                        done();
                    });
                }, 20000);
            });
        }, 5000);
    });
});
