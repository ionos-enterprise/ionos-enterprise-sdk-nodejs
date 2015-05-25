var assert = require('assert');
var pb = require('../lib/libprofitbricks');

var user = 'test@profitbricks.com';
var pass = 'testPass123';
var dc = {};
var dcData = {};

describe('Datacenter tests', function(){
    this.timeout(20000);

    before(function(done){
        dcData = {
            "properties": {
                "name":"Test Data Center",
                "location":"us/las",
                "description":"Test description"
            }
        };

        pb.pbauth(new Buffer(user + ':' + pass, 'ascii').toString('base64'));
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
    });

    it('Update datacenter', function(done){
        updateData = {
            "properties":{
                "name": "Test DC - UPDATED",
                "description": "This datacenter is updated using node.js SDK"
            }
        };
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
        })
    });

    it('Patch datacenter', function(done){
        patchData = {
            "name": "Test DC - PATCHED",
            "description": "This datacenter is patched using node.js SDK"
        };

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
        })
    });

    it('Delete datacenter', function(done){
        pb.deleteDatacenter(dc.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, '');
            pb.getDatacenter(dc.id, function(error, response, body){
                assert.equal(error, null);
                var object = JSON.parse(body);
                assert.equal(object.messages[0].errorCode, '309');
                assert.equal(object.messages[0].message, 'Resource does not exist');
                done();
            });
        });
    });
});
