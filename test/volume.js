/**
 * Created by ssabic on 09/07/15.
 */
var assert = require('assert');
var lib = require('../lib/libionosenterprise');
var helper = require('../test/testHelper');
var config = require('../test/config');
var dc = {};
var volume = {};
var volumeImage = {};

describe('Volume tests', function(){
    this.timeout(300000);

    before(function(done){
        helper.authenticate(lib);
        lib.listImages(function (error, response, body) {
            var object = JSON.parse(body);
            var images = object.items;
            for (var i = 0; i < images.length; i++) {
                if (images[i].properties.location == 'us/las') {
                    if (images[i].properties.imageType == "HDD") {
                        if (images[i].properties.name.indexOf('Ubuntu-16.04') > -1) {
                            volumeImage = images[i];
                        }
                    }
                }
            }
            lib.createDatacenter(config.dcData, function(error, response, body){
                assert.equal(error, null);
                dc = JSON.parse(body);
                done();
            });
        });
    });

    after(function(done){
        lib.deleteDatacenter(dc.id, function(error, response, body){
            assert.equal(error, null);
            done();
        });
    });

    it('List volumes - empty datacenter', function(done){
        lib.listVolumes(dc.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.items.length, 0);
            done();
        });
    });

    it('Create volume', function (done) {
        config.bootVolume.properties.image = volumeImage.id;
        lib.createVolume(dc.id, config.bootVolume, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            assert.equal(object.type, 'volume');
            assert.equal(object.properties.name, config.bootVolume.properties.name);
            assert.equal(object.properties.size, config.bootVolume.properties.size);
            assert.equal(object.properties.bus, config.bootVolume.properties.bus);
            assert.equal(object.properties.availabilityZone, config.bootVolume.properties.availabilityZone);
            assert.equal(object.properties.type, config.bootVolume.properties.type);
            assert.equal(object.properties.image, volumeImage.id);
            assert.equal(object.properties.sshKeys.length, 1);
            assert.equal(object.properties.sshKeys[0], config.bootVolume.properties.sshKeys[0]);
            volume = object;
            done();
        });
    });

    it('Create volume failure', function(done){
        var volumeReq = {
            "properties": {
                "name": "NodeJS SDK Test",
                "type": "HDD",
                "licenceType": "UNKNOWN"
            }
        };
        setTimeout(function () {
            lib.createVolume(dc.id, volumeReq, function (error, response, body) {
                var object = JSON.parse(body);
                assert.equal(object['httpStatus'], 422);
                assert.ok(object['messages'][0]['message'].indexOf("Attribute 'size' is required") > -1);
                done();
            });
        }, 60000);
    });

    it('List volumes', function (done) {
        lib.listVolumes(dc.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.items.length, 1);
            assert.equal(object.items[0].type, 'volume');
            volume = object.items[0];
            done();
        });
    });

    it('Get volume', function (done) {
        setTimeout(function () {
            lib.getVolume(dc.id, volume.id, function (error, response, body) {;
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, volume.id);
                assert.equal(object.properties.name, volume.properties.name);
                assert.equal(object.type, 'volume');
                assert.equal(object.properties.size, volume.properties.size);
                assert.equal(object.properties.bus, volume.properties.bus);
                assert.equal(object.properties.availabilityZone, volume.properties.availabilityZone);
                assert.equal(object.properties.type, volume.properties.type);
                assert.equal(object.properties.image, volume.properties.image);
                assert.equal(object.properties.licenceType, volume.properties.licenceType);
                done();
            });
        }, 90000);
    });

    it('Get volume failure', function (done) {
        lib.getVolume(dc.id, '00000000-0000-0000-0000-000000000000', function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('Update volume', function(done){
        var volumeUpdate = {
            "properties": {
                "name": config.bootVolume.properties.name + " RENAME UPDATED",
                "size": "5"
            }
        };
        setTimeout(function () {
            lib.updateVolume(dc.id, volume.id, volumeUpdate, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, volume.id);
                assert.equal(object.properties.name, volumeUpdate.properties.name);
                assert.equal(object.type, 'volume');
                assert.equal(object.properties.size, 5);
                done();
            });
        }, 60000);
    });

    it('Patch volume', function(done){
        var volumePatch = {
            "name": config.bootVolume.properties.name + " RENAME PATCHED"
        };
        lib.patchVolume(dc.id, volume.id, volumePatch, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, volume.id);
            assert.equal(object.type, 'volume');
            setTimeout(function () {
                lib.getVolume(dc.id, volume.id, function (error, response, body) {
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.properties.name, volumePatch.name);
                    done();
                });
            }, 60000);
        });
    });

    it('Delete volume', function(done){
        lib.deleteVolume(dc.id, volume.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, "");
            done();
        });
    });
});
