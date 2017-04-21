/**
 * Created by ssabic on 09/07/15.
 */
var assert = require('assert');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var dc = {};
var volume = {};

var volumeJson = {
    properties: {
        name: "Test volume",
        size: "1",
        bus: "VIRTIO",
        licenceType: "LINUX",
        type : "HDD",
        availabilityZone : "ZONE_3"
    }
};

describe('Volume tests', function(){
    this.timeout(80000);

    before(function(done){
        var dcData = {
            "properties": {
                "name":"Test Data Center",
                "location":"us/las",
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

    it('List volumes - empty datacenter', function(done){
        pb.listVolumes(dc.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.items.length, 0);
            done();
        });
    });

    it('Create volume', function(done){
        pb.createVolume(dc.id, volumeJson, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            volume = object;
            setTimeout(function(){
                pb.listVolumes(dc.id, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.items.length, 1);
                    done();
                });
            }, 10000);
        });
    });

    it('Create volume failure', function(done){
      volumeJson.properties.type = "YYD"; // <-- Pass bad volume type
        pb.createVolume(dc.id, volumeJson, function(error, response, body){
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 422); // <-- Check for validation error
            done();
        });
    });

    it('Get volume', function(done){
        pb.getVolume(dc.id, volume.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, volume.id);
            assert.equal(object.properties.name, volume.properties.name);
            done();
        });
    });

    it('Update volume', function(done){
        var volumeUpdate = {
            "properties":{
                "name": "Test volume - updated",
                "size": "1"
            }
        };
        pb.updateVolume(dc.id, volume.id, volumeUpdate, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, volume.id);
            assert.equal(object.properties.name, volumeUpdate.properties.name);
            done();
        });
    });

    it('Patch volume', function(done){
        var volumePatch = {
            "name": "Test volume - updated"
        };
        pb.patchVolume(dc.id, volume.id, volumePatch, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, volume.id);
            assert.equal(object.properties.name, volumePatch.name);
            done();
        });
    });

    it('Delete volume', function(done){
        pb.deleteVolume(dc.id, volume.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, "");
            done();
        });
    });
});
