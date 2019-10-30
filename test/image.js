/**
 * Created by ssabic on 06/07/15.
 */
var assert = require('assert-plus');
var lib = require('../lib/libionosenterprise');
var helper = require('../test/testHelper');
var config = require('../test/config');
var image = {};

describe('Image tests', function(){
    this.timeout(80000);

    before(function(done){
        helper.authenticate(lib);
        done();
    });

    it('List images', function(done){
        lib.listImages(function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.ok(object.items.length > 0);
            assert.equal(object.items[0].type, 'image');

            var images = object.items;
            for (var i = 0; i < images.length; i++) {
                if (images[i].properties.location == 'us/las') {
                    if (images[i].properties.imageType == "HDD") {
                        if (images[i].properties.name.indexOf('Ubuntu-16.04') > -1) {
                            image = images[i];
                        }
                    }
                }
            }
            done();
        });
    });

    it('Get image', function(done){
        lib.getImage(image.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(image.id, object.id);
            assert.equal(object.type, 'image');
            assert.notEqual(image.properties.name, '');
            assert.equal(image.properties.description, '');
            assert.ok(image.properties.size > 0);
            assert.ok(config.locations.indexOf(image.properties.location) > -1);
            assert.ok(config.licenceType.indexOf(image.properties.licenceType) > -1);
            assert.ok(config.imageType.indexOf(image.properties.imageType) > -1);
            assert.array(image.properties.imageAliases);
            assert.bool(image.properties.cpuHotPlug);
            assert.bool(image.properties.cpuHotUnplug);
            assert.bool(image.properties.ramHotPlug);
            assert.bool(image.properties.ramHotUnplug);
            assert.bool(image.properties.nicHotPlug);
            assert.bool(image.properties.nicHotUnplug);
            assert.bool(image.properties.discVirtioHotPlug);
            assert.bool(image.properties.discVirtioHotUnplug);
            assert.bool(image.properties.discScsiHotPlug);
            assert.bool(image.properties.discScsiHotUnplug);
            assert.bool(image.properties.public);
            done();
        })
    });

    it('Get image failure', function (done) {
        lib.getImage('00000000-0000-0000-0000-000000000000', function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });
});
