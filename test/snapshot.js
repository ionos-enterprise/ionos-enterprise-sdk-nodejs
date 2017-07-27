/**
 * Created by ssabic on 09/07/15.
 */
var assert = require('assert-plus');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var config = require('../test/config');
var dc = {};
var volume = {};
var snapshot = {};

describe('Snapshot tests', function() {
    this.timeout(300000);

    before(function(done) {
        helper.authenticate(pb);
        pb.createDatacenter(config.dcData, function(error, response, body) {
            assert.equal(error, null);
            dc = JSON.parse(body);
            pb.createVolume(dc.id, config.volume, function(error, response, body) {
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

    after(function (done) {
        if (snapshot != null) {
            setTimeout(function () {
                pb.deleteSnapshot(snapshot.id, function (error, response, body) {
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.equal(body, "");
                });
                setTimeout(function () {
                    pb.deleteDatacenter(dc.id, function (error, response, body) {
                        assert.equal(error, null);
                        done();
                    });
                }, 60000);
            }, 90000);
        } else {
            pb.deleteDatacenter(dc.id, function (error, response, body) {
                assert.equal(error, null);
                done();
            });
        }
    });

    it('Create snapshot', function(done) {
        setTimeout(function() {
            pb.createSnapshot(dc.id, volume.id, config.snapshot, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.notEqual(object.id, null);
                assert.equal(object.type, "snapshot");
                snapshot = object;
                assert.equal(object.properties.name, config.snapshot.name);
                assert.equal(object.properties.description, config.snapshot.description);
                done();
            });
        }, 20000);
    });

    it('Create snapshots failure', function (done) {
        pb.createSnapshot('00000000-0000-0000-0000-000000000000', volume.id, config.snapshot, function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('List snapshots', function (done) {
        setTimeout(function () {
            pb.listSnapshots(function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.ok(object.items.length > 0);
                assert.equal(object.items[0].type, "snapshot");
                done();
            });
        }, 20000);
    });

    it('Get snapshots', function(done) {
        pb.getSnapshot(snapshot.id, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, snapshot.id);
            assert.equal(object.type, "snapshot");
            snapshot = object;
            assert.equal(object.properties.name, snapshot.properties.name);
            assert.equal(object.properties.description, config.snapshot.description);
            assert.equal(object.properties.location, 'us/las');
            assert.equal(object.properties.size, volume.properties.size);
            assert.equal(object.properties.cpuHotPlug, volume.properties.cpuHotPlug);
            assert.equal(object.properties.cpuHotUnplug, volume.properties.cpuHotUnplug);
            assert.equal(object.properties.ramHotPlug, volume.properties.ramHotPlug);
            assert.equal(object.properties.ramHotUnplug, volume.properties.ramHotUnplug);
            assert.equal(object.properties.nicHotPlug, volume.properties.nicHotPlug);
            assert.equal(object.properties.nicHotUnplug, volume.properties.nicHotUnplug);
            assert.equal(object.properties.discVirtioHotPlug, volume.properties.discVirtioHotPlug);
            assert.equal(object.properties.discVirtioHotUnplug, volume.properties.discVirtioHotUnplug);
            assert.equal(object.properties.discScsiHotPlug, volume.properties.discScsiHotPlug);
            assert.equal(object.properties.discScsiHotUnplug, volume.properties.discScsiHotUnplug);
            assert.equal(object.properties.licenceType, volume.properties.licenceType);
            done();
        });
    });

    it('Get snapshots failure', function (done) {
        pb.getSnapshot('00000000-0000-0000-0000-000000000000', function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('Update snapshot', function(done) {
        var snapshotUpdate = {
            "properties": {
                "name": config.snapshot.name + " - RENAME UPDATED",
                "description": config.snapshot.description + " - RENAME UPDATED"
            }
        };
        pb.updateSnapshot(snapshot.id, snapshotUpdate, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, snapshot.id);
            assert.equal(object.properties.name, snapshotUpdate.properties.name);
            assert.equal(object.properties.description, snapshotUpdate.properties.description);
            done();
        });
    });

    it('Patch snapshot', function(done) {
        var snapshotPatch = {
            "name": config.snapshot.name + " - RENAME PATCHED",
            "description": config.snapshot.description + " - RENAME PATCHED"
        };
        pb.patchSnapshot(snapshot.id, snapshotPatch, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, snapshot.id);
            assert.equal(object.properties.name, snapshotPatch.name);
            assert.equal(object.properties.description, snapshotPatch.description);
            done();
        });
    });

    it('Restore snapshot', function(done) {
        var newVolume = {};
        var volumeReq = {
            properties: {
                name: "NodeJS SDK Test 2",
                size: 2,
                bus: "VIRTIO",
                licenceType: "LINUX",
                type: "HDD"
            }
        };

        pb.createVolume(dc.id, volumeReq, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            newVolume = object;
            setTimeout(function() {
                pb.restoreSnapshot(dc.id, newVolume.id, {
                    "snapshotId": snapshot.id
                }, function(error, response, body) {
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

    it('Delete snapshot', function(done) {
        setTimeout(function() {
            pb.deleteSnapshot(snapshot.id, function(error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.equal(body, "");
                snapshot = null;
            });
            setTimeout(function() {
                pb.deleteDatacenter(dc.id, function(error, response, body) {
                    assert.equal(error, null);
                    done();
                });
            }, 60000);
        }, 180000);
    });
});