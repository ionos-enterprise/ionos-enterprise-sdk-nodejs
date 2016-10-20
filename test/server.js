var assert = require('assert');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var dc = {};
var server = {};
var volume = {};

var serverData = {
    "properties": {
        "name": "Test Server",
        "ram": 1024,
        "cores": 2
    },
    "entities": {
        "volumes": {
            "items": [{
                "properties": {
                    "size": 10,
                    "name": "test volume",
                    "licenceType": "UNKNOWN",
                    "bus": "VIRTIO",
                    "type": "HDD"
                }
            }]
        }
    }
};

describe('Server tests', function() {
    this.timeout(90000);

    before(function(done) {
        var dcData = {
            "properties": {
                "name": "Test Data Center",
                "location": "us/las",
                "description": "Test description"
            }
        };

        var volumeJson = {
            properties: {
                name: "Test volume",
                size: "1",
                bus: "VIRTIO",
                licenceType: "LINUX",
                type: "HDD"
            }
        };

        helper.authenticate(pb);
        pb.createDatacenter(dcData, function(error, response, body) {
            assert.equal(error, null);
            dc = JSON.parse(body);
            pb.createVolume(dc.id, volumeJson, function(error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.notEqual(object.id, null);
                volume = object;
                done();
            });
        });
    });

    after(function(done) {
        pb.deleteDatacenter(dc.id, function(error, response, body) {
            assert.equal(error, null);
            done();
        });
    });

    it('List servers - empty datacenter', function(done) {
        setTimeout(function() {
            pb.listServers(dc.id, function(error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.items.length, 0);
                done();
            }, 30000);
        });
    });

    it('Create server', function(done) {
        pb.createServer(dc.id, serverData, function(error, response, body) {
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

    it('List servers', function(done) {
        setTimeout(function() {
            pb.listServers(dc.id, function(error, response, body) {
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
        }, 30000);
    });

    it('Get server', function(done) {
        pb.getServer(dc.id, server.id, function(error, response, body) {
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

    it('Update server', function(done) {
        updateData = {
            "properties": {
                "name": "Test Server - UPDATED",
                "ram": 2048,
                "cores": 2
            }
        };
        pb.updateServer(dc.id, server.id, updateData, function(error, response, body) {
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

    it('Patch server', function(done) {
        patchData = {
            "name": "Test Server - PATCHED",
            "ram": 1024,
            "cores": 2
        };

        pb.patchServer(dc.id, server.id, patchData, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, server.id);
            setTimeout(function() {
                pb.getServer(dc.id, server.id, function(error, response, body) {
                    var object = JSON.parse(body);
                    assert.equal(object.properties.name, patchData.name);
                    assert.equal(object.properties.ram, patchData.ram);
                    assert.equal(object.properties.cores, patchData.cores);
                    done();
                });
            }, 70000);
        });
    });

    it('List attached volumes - empty server', function(done) {
        pb.listAttachedVolumes(dc.id, server.id, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.items.length, 1);
            done();
        });
    });

    it('Attach volume', function(done) {
        pb.attachVolume(dc.id, server.id, volume.id, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            setTimeout(function() {
                pb.listAttachedVolumes(dc.id, server.id, function(error, response, body) {
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.items.length, 2);
                    done();
                });
            }, 60000);
        });
    });

    it('Get attached volume', function(done) {
        setTimeout(function() {
            pb.getAttachedVolume(dc.id, server.id, volume.id, function(error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, volume.id);
                done();
            });
        }, 10000)
    });

    it('Detach volume', function(done) {
        pb.detachVolume(dc.id, server.id, volume.id, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            setTimeout(function() {
                pb.listAttachedVolumes(dc.id, server.id, function(error, response, body) {
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.items.length, 1);
                    done();
                });
            }, 60000);
        });
    });


    it('Delete server', function(done) {
        pb.deleteServer(dc.id, server.id, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, '');
            setTimeout(function() {
                pb.getServer(dc.id, server.id, function(error, response, body) {
                    assert.equal(error, null);
                    var object = JSON.parse(body);
                    assert.equal(object.messages[0].errorCode, '309');
                    assert.equal(object.messages[0].message, 'Resource does not exist');
                });
                setTimeout(function() {
                    pb.deleteDatacenter(dc.id, function(error, response, body) {
                        assert.equal(error, null);
                        done();
                    });
                }, 1000);
            }, 50000);

        });
    });
});