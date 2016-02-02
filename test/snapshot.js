/**
 * Created by ssabic on 09/07/15.
 */
var assert = require('assert');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var dc = {};
var volume = {};
var snapshot = {};
var snapshotCount = 0;

var snapshotJson = {
    "name": "Test snapshot",
    "description": "Test snapshot description"
};

describe('Snapshot tests', function(){
    this.timeout(80000);

    before(function(done){
        var dcData = {
            "properties": {
                "name":"Test Data Center",
                "location":"us/lasdev",
                "description":"Test description"
            }
        };

        var volumeJson = {
            properties: {
                name: "Test volume",
                size: "1",
                bus: "VIRTIO",
                licenceType: "LINUX",
                type : "HDD"
            }
        };

        helper.authenticate(pb);
        pb.createDatacenter(dcData, function(error, response, body){
            assert.equal(error, null);
            dc = JSON.parse(body);
            pb.createVolume(dc.id, volumeJson, function(error, response, body){
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

    after(function(done){
        pb.deleteDatacenter(dc.id, function(error, response, body){
            assert.equal(error, null);
            done();
        });
    });

    it('List snapshots - empty datacenter', function(done){
        pb.listSnapshots(function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            snapshotCount = object.items.length;
            done();
        });
    });

    it('Create snapshot', function(done){
        setTimeout(function(){
            pb.createSnapshot(dc.id, volume.id, snapshotJson, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.notEqual(object.id, null);
                assert.equal(object.properties.name, snapshotJson.name);
                snapshot = object;
                setTimeout(function(){
                    pb.listSnapshots(function(error, response, body){
                        assert.equal(error, null);
                        assert.notEqual(response, null);
                        assert.notEqual(body, null);
                        var object = JSON.parse(body);
                        assert.equal(object.items.length, snapshotCount + 1);
                        done();
                    });
                }, 20000);
            });
        }, 20000);
    });

    it('Get snapshots', function(done){
        pb.getSnapshot(snapshot.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, snapshot.id);
            assert.equal(object.properties.name, snapshot.properties.name);
            done();
        });
    });

    it('Update snapshot', function(done){
        var snapshotUpdate = {
            "properties":{
                "name": "Test snapshot - updated"
            }
        };
        pb.updateSnapshot(snapshot.id, snapshotUpdate, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, snapshot.id);
            assert.equal(object.properties.name, snapshotUpdate.properties.name);
            done();
        });
    });

    it('Patch snapshot', function(done){
        var snapshotPatch = {
            "name": "Test snapshot - patched"
        };
        pb.patchSnapshot(snapshot.id, snapshotPatch, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, snapshot.id);
            assert.equal(object.properties.name, snapshotPatch.name);
            done();
        });
    });

    it('Restore snapshot', function(done){
        var newVolume = {};
        var volumeJson2 = {
            properties: {
                name: "Test volume 2",
                size: "1",
                bus: "VIRTIO",
                licenceType: "LINUX",
                type : "HDD"
            }
        };

        pb.createVolume(dc.id, volumeJson2, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            newVolume = object;
            setTimeout(function(){
                pb.restoreSnapshot(dc.id, newVolume.id, {"snapshotId": snapshot.id}, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.equal(body, "");
                    assert.equal(response.statusCode, 202);
                    assert.equal(response.statusMessage, 'Accepted');
                    done();
                })
            }, 20000);
        });
    });

    it('Delete snapshot', function(done){
        setTimeout(function(){
            pb.deleteSnapshot(snapshot.id, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.equal(body, "");
                done();
            });
        }, 60000);
    });
});
