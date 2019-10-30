var assert = require('assert');
var lib = require('../lib/libionosenterprise');
var helper = require('../test/testHelper');
var config = require('../test/config');
var dc = {};
var dcCom = {};

describe('Datacenter tests', function(){
    this.timeout(60000);

    before(function(done){
        helper.authenticate(lib);
        done();
    });

    after(function (done) {
        lib.deleteDatacenter(dcCom.id, function (error, response, body) {
            assert.ok(response);
            done();
        });
    });

    it('List datacenters', function(done){
        lib.listDatacenters(function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.items.length > 0, true)
            assert.equal(object.items[0].type, 'datacenter');
            done();
        });
    });

    it('Create datacenter simple', function(done){
        lib.createDatacenter(config.dcData, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            assert.equal(object.type, 'datacenter');
            assert.equal(object.properties.name, config.dcData.properties.name);
            assert.equal(object.properties.location, config.dcData.properties.location);
            assert.equal(object.properties.description, config.dcData.properties.description);
            dc = object;
            done();
        });
    });

    it('Create datacenter composite', function (done) {
        lib.createDatacenter(config.dcDataCom, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            assert.equal(object.type, 'datacenter');
            assert.equal(object.properties.name, config.dcDataCom.properties.name);
            assert.equal(object.properties.location, config.dcDataCom.properties.location);
            assert.equal(object.properties.description, config.dcDataCom.properties.description);
            assert.notEqual(object.entities.servers, null);
            assert.notEqual(object.entities.volumes, null);
            dcCom = object;
            done();
        });
    });

    it('Get datacenter', function(done){
        setTimeout(function(){
            lib.getDatacenter(dc.id, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, dc.id);
                assert.equal(object.type, 'datacenter');
                assert.equal(object.properties.name, dc.properties.name);
                assert.equal(object.properties.location, dc.properties.location);
                assert.equal(object.properties.description, dc.properties.description);
                done();
            });
        }, 1000);
    });

    it('Get datacenter failure', function(done){
        lib.getDatacenter('00000000-0000-0000-0000-000000000000', function(error, response, body){
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('Create datacenter failure', function (done) {
        var dcReq = {
            "properties": {
            }
        }
        lib.createDatacenter(dcReq, function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 422);
            assert.ok(object['messages'][0]['message'].indexOf("Attribute 'location' is required") > -1);
            done();
        });
    });

    it('Update datacenter', function(done){
        var updateData = {
            "properties":{
                "name": "NodeJS SDK Test - RENAME UPDATED",
                "description": "This datacenter is updated using node.js SDK"
            }
        };
        setTimeout(function(){
            lib.updateDatacenter(dc.id, updateData, function(error, response, body){
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
        }, 10000);
    });

    it('Patch datacenter', function(done){
        var patchData = {
            "name": "NodeJS SDK Test - RENAME PATCHED",
            "description": "This datacenter is patched using node.js SDK"
        };
        setTimeout(function(){
            lib.patchDatacenter(dc.id, patchData, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, dc.id);
                assert.equal(object.properties.name, patchData.name);
                assert.equal(object.properties.location, dc.properties.location);
                assert.equal(object.properties.description, patchData.description);
                assert.ok(object.properties.version > 1);
                done();
            });
        }, 30000);
    });

    it('Delete datacenter', function(done){
        setTimeout(function(){
            lib.deleteDatacenter(dc.id, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.equal(response.statusCode, 202);
                assert.equal(body, '');
                setTimeout(function () {
                    lib.getDatacenter(dc.id, function(error, response, body){
                        assert.equal(error, null);
                        var object = JSON.parse(body);
                        assert.equal(object.messages[0].errorCode, '309');
                        assert.equal(object.messages[0].message, 'Resource does not exist');
                        done();
                    });
                }, 2000);
            });
        }, 10000);
    });
});
