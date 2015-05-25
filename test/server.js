var assert = require('assert');
var pb = require('../lib/libprofitbricks');

var user = 'test@profitbricks.com';
var pass = 'testPass123';
var dc = {};
var server = {};
var serverData =  {
    "properties": {
        "name": "Test Server",
        "ram": 4096,
        "cores": 4
    },
    "entities": {
        "volumes": {
            "items": [{
                "properties": {
                    "size": 10,
                    "name": "test volume",
                    "image": "caaffaa9-e75e-11e4-91fd-8fa3eaae9f6b",
                    "bus": "VIRTIO"
                }
            }]
        }
    }
};

describe('Server tests', function(){
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

    it('List servers - empty datacenter', function(done){
        pb.listServers(dc.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.items.length, 0);
            done();
        });
    });

    it('Create server', function(done){
        pb.createServer(dc.id, serverData, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            assert.equal(object.properties.name, serverData.properties.name);
            assert.equal(object.properties.ram, serverData.properties.ram);
            assert.equal(object.properties.cores, serverData.properties.cores);
            assert.notEqual(object.entities.volumes, null);
            server = object;
            done();
        });
    });

    it('List servers', function(done){
        setTimeout(function(){
            pb.listServers(dc.id, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.items.length, 1);
                assert.equal(object.items[0].id, server.id);
                assert.equal(object.items[0].properties.name, serverData.properties.name);
                assert.equal(object.items[0].properties.ram, serverData.properties.ram);
                assert.equal(object.items[0].properties.cores, serverData.properties.cores);
                assert.notEqual(object.items[0].entities.volumes, null);
                done();
            });
        }, 5000);
    });

    it('Get server', function(done){
        pb.getServer(dc.id, server.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, server.id);
            assert.equal(object.properties.name, serverData.properties.name);
            assert.equal(object.properties.ram, serverData.properties.ram);
            assert.equal(object.properties.cores, serverData.properties.cores);
            assert.notEqual(object.entities.volumes, null);
            done();
        });
    });

    it('Update server', function(done){
        updateData = {
            "properties":{
                "name": "Test Server - UPDATED",
                "ram": 8192,
                "cores": 8
            }
        };
        pb.updateServer(dc.id, server.id, updateData, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, server.id);
            assert.equal(object.properties.name, updateData.properties.name);
            assert.equal(object.properties.ram, updateData.properties.ram);
            assert.equal(object.properties.cores, updateData.properties.cores);
            done();
        });
    });

    it('Patch server', function(done){
        patchData = {
            "name": "Test Server - PATCHED",
            "ram": 4096,
            "cores": 6
        };

        pb.patchServer(dc.id, server.id, patchData, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, server.id);
            setTimeout(function(){
                pb.getServer(dc.id, server.id, function(error, response, body){
                    var object = JSON.parse(body);
                    assert.equal(object.properties.name, patchData.name);
                    assert.equal(object.properties.ram, patchData.ram);
                    assert.equal(object.properties.cores, patchData.cores);
                    done();
                });
            }, 10000);
        });
    });

    it('Delete server', function(done){
        pb.deleteServer(dc.id, server.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, '');
            setTimeout(function(){
                pb.getServer(dc.id, server.id, function(error, response, body){
                    assert.equal(error, null);
                    var object = JSON.parse(body);
                    assert.equal(object.messages[0].errorCode, '309');
                    assert.equal(object.messages[0].message, 'Resource does not exist');
                    done();
                });
            }, 10000);
        });
    });
});
